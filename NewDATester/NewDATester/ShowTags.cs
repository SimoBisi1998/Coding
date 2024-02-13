using NewDATester;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using LoggingLib;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using DATester;
using System.Globalization;
using S7.Net;
using PLCComDA;
using System.IO;
using S7Communication;

namespace TesterDA
{
    public partial class ShowTags : Form
    {
        public TreeNode root;
        public TreeNode selectedNode;
        public string selectedTabPage;
        public static Boolean formIsClosed = false;
        public String address;
        public ServiceConfig sc = new ServiceConfig();
        Dictionary<string,string> mainCSV = new Dictionary<string, string>();


        //create Dictionary to mapping PLC:IP
        Dictionary<string, string> dict = new Dictionary<string, string>();

        public ShowTags()
        {
            InitializeComponent();

            //setup user interface
            setupUI();
        }

        public void setupUI()
        {
            //Create a dictionary from cpuList build like PLC:IPaddress
            foreach (PLC plc in ServerConnection.cpulist.Cpu)
            {
                dict.Add(plc.PlcId, plc.IpAddress);
            }

            //verify the type of the server in config.xml
            verifyServerType();
        }

        public void verifyServerType()
        {
            //if the server is IBH
            if (ConfigurationServerForm.servConf.Server.ServerType.Equals(ServerTypes.IBH))
            {
                //remove the first page
                tabControl.TabPages.Remove(tabControl.TabPages[2]);

                //create the IBHOPC tree
                addItemsToList();
            }
            else
            {
                //remove the first page
                tabControl.TabPages.Remove(tabControl.TabPages[0]);
                //tabControl.TabPages.Remove(tabControl.TabPages[1]);

                //rename the remaining page like S7Direct
                tabControl.TabPages[0].Text = "S7Direct ACK";
                selectedTabPage = "S7Direct ACK";

                //set to hide the textbox of the value read
                valueFromRead.Visible = false;
            }

            //Create che layoutPanel with the list of label and textbox
            createListOfTabelPanel();
        }

        public void readEthernetS7()
        {
            //get the pair of plcID:Ipaddress from dictionary to List
            List<KeyValuePair<string,string>> plcDevice = new List<KeyValuePair<string, string>>(dict);

            //reset text and button color
            readButton.BackColor = Color.Empty;
            writeButton.BackColor = Color.Empty;
            textBoxWriteValue.Text = "";
            valueFromRead.Text = "";
            

            //set the address of the ACK
            string ackAddress = "DB197.DBX3.0";

            try
            {
                //foreach plcDevice in plcDevice
                for (int index = 0; index < plcDevice.Count; index++)
                {
                    try
                    {
                        //Create an instance of PLC
                        Plc plc = new Plc(CpuType.S7300, plcDevice[index].Value, 0, 2);

                        //try to create an ethernet communication with the plc 
                        plc.Open();

                        if (plc.IsConnected)
                        {
                            try
                            {
                                //read from the plc
                                object output = plc.Read(ackAddress);
                                if (output != null)
                                {
                                    //foreach control that is present inside the table
                                    foreach (Control control in tablePanel.Controls)
                                    {
                                        if (control != null && control is TextBox && control.Name.Equals(plcDevice[index].Key))
                                        {
                                            //assign to the textbox the value red from the plc
                                            TextBox tb = control as TextBox;
                                            tb.Text = output.ToString();

                                            //get the data type of the value that is extracted
                                            textBoxDataType.Text = output.GetType().Name;
                                            textBoxDataType.Tag = output.GetType();

                                            break;
                                        }
                                    }
                                }
                            }
                            catch (Exception ex)
                            {
                                Logging.writeLog(Program.errorPath, "S7 ethernet read", ex.Message, "");
                                return;
                            }

                            //close connection
                            plc.Close();
                        }
                    }catch(Exception e)
                    {
                        Logging.writeLog(Program.errorPath, "Connection S7Direct", e.Message, "");
                        readButton.BackColor = Color.Red;
                        return;
                    }
                }
            }catch(Exception ex)
            {
                Logging.writeLog(Program.errorPath, "Connection to PLC using S7.net", ex.Message, "");
                return;
            }   
        }

        public void writeEthernetS7()
        {
            //get the pair of plcID:Ipaddress from dictionary to List
            List<KeyValuePair<string, string>> plcDevice = new List<KeyValuePair<string, string>>(dict);

            //reset textbox of the value that is read
            valueFromRead.Text = "";

            //set address 
            string ackAddress = "DB197.DBX3.0";

            try
            {
                for (int index = 0; index < plcDevice.Count; index++)
                {
                    try
                    {
                        //Create an instance of PLC
                        Plc plc = new Plc(CpuType.S7300, plcDevice[index].Value, 0, 2);

                        //try to create an ethernet communication with the plc 
                        plc.Open();
                        if (plc.IsConnected)
                        {
                            try
                            {
                                //if the value is false and the value that is present on the text box dedicated for the write values is 1/True, so i will write on the ackAddress "true", otherwise "false"
                                switch(textBoxWriteValue.Text)
                                {
                                    case "1":
                                    case "True":
                                    case "true":
                                        {
                                            plc.Write(ackAddress, true);
                                            Logging.writeLog(Program.logPath, "Writing S7Direct communication: ", "Value: " + "'true'" + " is written to the " + plcDevice[index].Key + " into " + plcDevice[index].Key + ackAddress, "");
                                            break;
                                        }
                                    

                                    case "0":
                                    case "False":
                                    case "false":
                                        {
                                            plc.Write(ackAddress, false);
                                            Logging.writeLog(Program.logPath, "Writing S7Direct communication: ", "Value: " + "'false'" + " is written to the " + plcDevice[index].Key + " into "+ plcDevice[index].Key+ackAddress, "");
                                            break;
                                        }

                                    default:
                                        writeButton.BackColor = Color.Red;
                                        throw new Exception("String inserted by user was not in the correct format");
                                }
                            }
                            catch (Exception e)
                            {
                                Logging.writeLog(Program.errorPath, "S7 ethernet write", e.Message, "");
                                writeButton.BackColor = Color.Red;
                                return;
                            }

                            //close the S7 connection
                            plc.Close();
                        }
                    }catch(Exception e)
                    {
                        Logging.writeLog(Program.errorPath, "connection to the CPU", e.Message, "");
                        return;
                    }
                    
                }
            }catch(Exception e)
            {
                Logging.writeLog(Program.errorPath, "connection to PLC using S7.net", e.Message, "");
                readButton.BackColor = Color.Red;
                return;
            }   
        }

        public void cyclicOnTree()
        {
            treeView.HideSelection = false;

            try
            {
                //trigger event of selected node in the treeView
                treeView.AfterSelect += (sender, e) =>
                {
                    selectedNode = e.Node;

                    //reset text box
                    valueFromRead.Text = "";
                    textBoxWriteValue.Text = "";

                    //reset color button
                    readButton.BackColor = Color.Empty;
                    writeButton.BackColor = Color.Empty;
                };

                //trigger event of selected new tab in tab control
                tabControl.SelectedIndexChanged += (sender, e) =>
                {
                    selectedTabPage = tabControl.SelectedTab.Text;
                    //if selectedtabPag is ACK so show the list of ack
                    if (selectedTabPage.Equals("ACK"))
                    {
                        //clear all the controls after selected again this page
                        tablePanel.Controls.Clear();
                        
                        //set invisible the textbox of the reading value
                        valueFromRead.Visible = false;

                        //create the list of PLC:Value where value is the ACK
                        createListOfTabelPanel();
                    }
                    else
                    {
                        if (selectedTabPage.Equals("S7Direct ACK"))
                        {
                            valueFromRead.Visible = false;
                            hexText.Visible = false;
                            binaryText.Visible = false;
                            hexadecimalText.Visible = false;
                            decimalText.Visible = false;
                            arrayText.Visible = false;
                            return;
                        }

                        //else if its the IBH page set the text box of reading value to true
                        valueFromRead.Visible = true;
                        hexText.Visible = true;
                        binaryText.Visible = true;
                        hexadecimalText.Visible = true;
                        decimalText.Visible = true;
                        arrayText.Visible = true;

                        bitTextBox.Enabled = false;
                    }
                };

                listOfDataType.SelectedIndexChanged += (sender, e) =>
                {
                    switch(listOfDataType.SelectedItem)
                    {
                        case "Bool":
                            {
                                bitTextBox.Enabled = true;
                                textBoxLength.Enabled = false;
                                break;
                            }
                        case "String":
                            {
                                textBoxLength.Enabled = true;
                                bitTextBox.Enabled = false;
                                break;
                            }
                        default:
                            {
                                textBoxLength.Enabled = false;
                                bitTextBox.Enabled = false;
                                break;
                            }
                    }
                };
            }
            catch (Exception exception)
            {
                Logging.writeLog(Program.errorPath, "selecting tag or tab", exception.Message, "");
                return;
            }
        }

        public void readFromDBS7Direct()
        {
            List<KeyValuePair<string, string>> plcDevice = new List<KeyValuePair<string, string>>(dict);

            //get all the parameters from the addressBox
            PLCAddress device = getDataTypeFromAddress(addressBox.Text);

            //reset read button color
            readButton.BackColor = Color.Empty;
            writeButton.BackColor = Color.Empty;

            //reset textbox
            binaryText.Text = "";
            hexText.Text = "";

            string deviceId = textBoxPlcID.Text;
            string deviceAddress;
            object value = null;
            string stringName = "";
            byte[] arrayByte = null;

            //find that deviceId in the list of plc in dict with the proper deviceAddress
            if (dict.TryGetValue(deviceId,out deviceAddress))
            {
                try
                {
                    //create instance of PLC
                    Plc plc = new Plc(CpuType.S7300, deviceAddress, 0, 2);

                    //try to open a connection to that plc
                    plc.Open();

                    //if a connection is established
                    if (plc.IsConnected)
                    {
                        try
                        {
                            //read bytes from the plc 
                            byte[] data = plc.ReadBytes(DataType.DataBlock, Int32.Parse(device.Datablock), Int16.Parse(device.PlcAddress), 100);

                            //selected dataType from the list of datatype
                            object dataType = listOfDataType.SelectedItem;

                            //verify data type written in the textbox
                            switch (dataType.ToString())
                            {
                                case "Word":
                                    {
                                        //word
                                        value = (ushort)plc.Read(addressBox.Text);
                                        arrayByte = BitConverter.GetBytes((ushort)value);
                                        break;
                                    }
                                case "Bool":
                                    {
                                        //bool
                                        if(device.DataType.Equals("X")) value = S7Communication.S7.GetBitAt(data, 0, Int16.Parse(bitTextBox.Text));
                                        break;
                                    }
                                case "Byte":
                                    {
                                        //byte
                                        value = S7Communication.S7.GetByteAt(data, 0);
                                        break;
                                    }
                                case "Int32":
                                    {
                                        value = ((uint)plc.Read(addressBox.Text)).ConvertToInt();
                                        arrayByte = BitConverter.GetBytes((int)value);
                                        break;
                                    }
                                case "Int16":
                                    {
                                        value = ((ushort)plc.Read(addressBox.Text)).ConvertToShort();
                                        arrayByte = BitConverter.GetBytes((short)value);
                                        break;
                                    }
                                case "Float":
                                    {
                                        value = S7Communication.S7.GetRealAt(data, 0);
                                        arrayByte = BitConverter.GetBytes((float)value);
                                        break;
                                    }
                                case "String":
                                    {
                                        stringName += S7Communication.S7.GetCharsAt(data, 0, Int16.Parse(textBoxLength.Text)+1);
                                        break;
                                    }
                                case "Double":
                                    {
                                        value = S7Communication.S7.GetLRealAt(data, 0);
                                        arrayByte = BitConverter.GetBytes((double)value);
                                        break;
                                    }
                                case "Sbyte":
                                    {
                                        value = S7Communication.S7.GetCharsAt(data, 0, 1);
                                        arrayByte = BitConverter.GetBytes((sbyte)value);
                                        break;
                                    }
                                case "Dword":
                                    {
                                        value = (uint)plc.Read(addressBox.Text);
                                        arrayByte = BitConverter.GetBytes((uint)value);
                                        break;
                                    }
                            }

                            //set tag type
                            textBoxDataType.Text = dataType.ToString();
                            textBoxDataType.Tag = dataType.ToString();

                            if (arrayByte != null)
                            {
                                if (BitConverter.IsLittleEndian)
                                {
                                    //reverse the array
                                    Array.Reverse(arrayByte);

                                    if(dataType.ToString().Equals("Float"))
                                    {
                                        //get floating value from arrayOfByte
                                        float floatValue = BitConverter.ToSingle(arrayByte, 0);
                                        valueFromRead.Text = convertValueToString(floatValue);
                                    }
                                    else
                                    {
                                        valueFromRead.Text = convertValueToString(value);
                                        binaryText.Text = convertValueToString(arrayByte);
                                        hexText.Text = $"{value:X}";
                                    }
                                    
                                }
                            }
                            else
                            {
                                if (dataType.ToString().Equals("String"))
                                {
                                    //set value red from PLC 
                                    valueFromRead.Text = stringName.Trim(new char[] {'\0'});
                                }else
                                {
                                    //set value red from PLC 
                                    valueFromRead.Text = convertValueToString(value);
                                }
                            }

                        }
                        catch(Exception e)
                        {
                            Logging.writeLog(Program.errorPath, "S7 reading communication", e.Message, "");
                            readButton.BackColor = Color.Red;
                            return;
                        }
                    }
                }catch(Exception e)
                {
                    Logging.writeLog(Program.errorPath, "S7 direct communication", e.Message, "");
                    readButton.BackColor = Color.Red;
                    return;
                }   
            }
        }

        public void writeToDBS7Direct()
        {
            List<KeyValuePair<string, string>> plcDevice = new List<KeyValuePair<string, string>>(dict);

            //get all the parameters from the addressBox
            PLCAddress device = getDataTypeFromAddress(addressBox.Text);

            //reset write button color
            writeButton.BackColor = Color.Empty;

            string deviceId = textBoxPlcID.Text;
            string deviceAddress;

            //find that deviceId in the list of plc in dict with the proper deviceAddress
            if (dict.TryGetValue(deviceId, out deviceAddress))
            {
                try
                {
                    //create instance of PLC
                    Plc plc = new Plc(CpuType.S7300, deviceAddress, 0, 2);

                    //try to open a connection to that plc
                    plc.Open();

                    //if a connection is established
                    if (plc.IsConnected)
                    {
                        try
                        {
                            //read bytes from the plc 
                            byte[] data = plc.ReadBytes(DataType.DataBlock, Int32.Parse(device.Datablock), 0, 100);

                            //selected dataType from the list of datatype
                            object dataType = listOfDataType.SelectedItem;

                            //initialize array of bytes
                            byte[] bytes = null;

                            //verify data type written in the textbox
                            switch (dataType.ToString())
                            {
                                case "Word":
                                    {
                                        //word
                                        bytes = BitConverter.GetBytes(UInt16.Parse(textBoxWriteValue.Text));
                                        break;
                                    }
                                case "Bool":
                                    {
                                        //bool
                                        if (!bitTextBox.Equals("") && (Int16.Parse(bitTextBox.Text) >= 0 && Int16.Parse(bitTextBox.Text) <= 7))
                                        {
                                            int bit = Int16.Parse(textBoxWriteValue.Text);
                                            plc.WriteBit(DataType.DataBlock, Int32.Parse(device.Datablock), Int16.Parse(device.PlcAddress), Int16.Parse(bitTextBox.Text), bit);
                                        }
                                        else writeButton.BackColor = Color.Red;

                                        break;
                                    }
                                case "Byte":
                                    {
                                        //byte
                                        bytes = BitConverter.GetBytes(Byte.Parse(textBoxWriteValue.Text));
                                        bytes = new byte[1] { bytes[0] };
                                        break;
                                    }
                                case "Int32":
                                    {
                                        //dint
                                        bytes = BitConverter.GetBytes(Int32.Parse(textBoxWriteValue.Text));
                                        break;
                                    }
                                case "Int16":
                                    {
                                        bytes = BitConverter.GetBytes(Int16.Parse(textBoxWriteValue.Text));
                                        break;
                                    }
                                case "Float":
                                    {
                                        bytes = BitConverter.GetBytes(float.Parse(textBoxWriteValue.Text));
                                        break;
                                    }
                                case "String":
                                    {
                                        bytes = Encoding.UTF8.GetBytes(textBoxWriteValue.Text+"\0");
                                        break;
                                    }
                                case "Sbyte":
                                    {
                                        bytes = BitConverter.GetBytes(Char.Parse(textBoxWriteValue.Text));
                                        break;
                                    }
                                case "Dword":
                                    {
                                        bytes = BitConverter.GetBytes(UInt32.Parse(textBoxWriteValue.Text));
                                        break;
                                    }
                                case "Double":
                                    {
                                        bytes = BitConverter.GetBytes(Double.Parse(textBoxWriteValue.Text));
                                        break;
                                    }
                            }

                            //if little endian and is not a bool
                            if (BitConverter.IsLittleEndian && !dataType.ToString().Equals("Bool") && !dataType.ToString().Equals("String"))
                            {
                                //reverse array for the bigendian notation
                                Array.Reverse(bytes, 0, bytes.Length);

                                //write bytes in that particular address for that datatype
                                plc.WriteBytes(DataType.DataBlock, Int32.Parse(device.Datablock), Int16.Parse(device.PlcAddress), bytes);
                            }
                            else 
                            {
                                //write bytes in that particular address for that datatype
                                plc.WriteBytes(DataType.DataBlock, Int32.Parse(device.Datablock), Int16.Parse(device.PlcAddress), bytes);
                            }

                            //write logpath
                            Logging.writeLog(Program.logPath, "S7 writing single address: ", "Value: " + textBoxWriteValue.Text + " is written to " + deviceId + " into " + addressBox.Text, "");
                        }
                        catch(Exception e)
                        {
                            Logging.writeLog(Program.errorPath, "S7 writing communication", e.Message, "");
                            writeButton.BackColor = Color.Red;
                            return;
                        }
                    }
                }
                catch (Exception e)
                {
                    Logging.writeLog(Program.errorPath, "S7 direct communication", e.Message, "");
                    writeButton.BackColor = Color.Red;
                    return;
                }
            }
        }

        public PLCAddress getDataTypeFromAddress(string addr)
        {
            //get parameters from address
            string db = addr.Split('.')[0];
            db = db.Substring(2, db.Length-2);

            //get the dataType from the addr
            string dataType = addr.Split('.')[1];
            dataType = dataType.Substring(2, 1);

            //get the address where to write from the addr
            string address = addr.Split('.')[1];
            address = address.Substring(3, address.Length-3);

            //create new instance of the plcAddress
            PLCAddress plcAddress = new PLCAddress(address, dataType, db);

            return plcAddress;
        }

        public void createListOfTabelPanel()
        {
            List<string> ackTags = new List<string>();
            int count = 0;

            //add style to the tablePanel
            tablePanel.ColumnStyles.Add(new ColumnStyle(SizeType.Percent, 50F));

            //foreach plcId in the ackTags (MAS,REW,..)
            foreach(string key in dict.Keys)
            {
                //create new label with particular style
                Label label = new Label();
                label.Text = key;
                label.Dock = DockStyle.Top;
                label.TextAlign = ContentAlignment.MiddleCenter;
                label.AutoSize = true;
                label.Margin = new Padding(0, 0, 0, 5);
                label.Font = new System.Drawing.Font("Arial", 12, System.Drawing.FontStyle.Regular);

                //Create new textbox in the same line
                TextBox tb = new TextBox();
                tb.TextAlign = HorizontalAlignment.Center;
                tb.Name = key;

                //set style for the row of the tableLayoutPanel
                tablePanel.RowStyles.Add(new RowStyle(SizeType.Absolute, 37));

                tablePanel.Controls.Add(label, 0, count);
                tablePanel.Controls.Add(tb, 1, count);

                //for each row there is a pair of PLCID:VALUE
                count++;
            }
        }

        public void addItemsToList()
        {
            //default tab
            selectedTabPage = "IBHOPC";

            //populate the treeView with the list of plc 
            populateTreeView(dict);

            //foreach plc add the list of tags
            foreach (String key in ServerConnection.dataBuffer.Keys)
            {
                for(int j = 0; j < root.Nodes.Count; j++)
                {
                    if (root.Nodes[j].Text.Equals(key.Substring(0, 3)))
                    {
                        for (int i = 0; i < root.Nodes.Count; i++)
                        {
                            if (root.Nodes[i].Text.Equals(root.Nodes[j].Text))
                            {
                                //foreach nodes in the treeView, add the list of tags for that node
                                root.Nodes[i].Nodes.Add(key);
                            }
                        }
                    }
                }
            }
        }

        public void populateTreeView(Dictionary<string, string> dict)
        {
            //initialize root node
            root = treeView.Nodes.Add("IBHOPC");

            //foreach plcId that is present on the dictionary (plcList.xml), so i will create as many nodes
            foreach (String plcId in dict.Keys)
            {
                root.Nodes.Add(plcId);
            }

        }

        public void readACKFromIBH()
        {
            //reset color of writing button
            writeButton.BackColor = Color.Empty;

            //get the pair of plcID:Ipaddress from dictionary to List
            List<KeyValuePair<string, string>> list = new List<KeyValuePair<string, string>>(dict);
            int count = 0;

            try
            {
                foreach (Control control in tablePanel.Controls)
                {
                    if (control != null && control is TextBox)
                    {
                        //read from the IBH the value of the ack
                        object targetId = ServerConnection.daClient.Read(list[count].Key + ".Generic." + (list[count].Key + "197b003_AckAlarm"));
                        TextBox tb = control as TextBox;
                        tb.Text = convertValueToString(targetId);

                        //get the datatype of the value
                        textBoxDataType.Text = targetId.GetType().Name;
                        textBoxDataType.Tag = targetId.GetType();

                        //increase the index of the List
                        count++;
                    }
                }
            }
            catch (Exception ex)
            {
                Logging.writeLog(Program.errorPath, "Read from OPC in ACK page", ex.Message, "");
                return;
            }
        }

        public void readValueFromIBH()
        {
            //reset color of the writer button
            writeButton.BackColor = Color.Empty;

            foreach (String key in ServerConnection.dataBuffer.Keys)
            {
                //if there is a selected node that is equal to a particular tag
                if (selectedNode != null && key.Equals(selectedNode.Text))
                {
                    address = key.Substring(0, 3) + ".Generic." + (key.Substring(0, 3) + key.Substring(3));
                    try
                    {
                        //read from the IBHOPC server that address (ex. MAS.Generic.MAS197b198)
                        object targetId = ServerConnection.daClient.Read(address);

                        valueFromRead.Text = convertValueToString(targetId);

                        textBoxDataType.Text = targetId.GetType().Name;
                        textBoxDataType.Tag = targetId.GetType();

                        break;
                    }
                    catch (Exception exception)
                    {
                        Logging.writeLog(Program.errorPath, "reading value", exception.Message, "");
                        return;
                    }
                }
            }
        }

        private void readButton_Click(object sender, EventArgs e)
        {
            //reset value of the reader/writer textbox
            textBoxWriteValue.Text = "";
            valueFromRead.Text = "";
            
            //if the selected tab page of the tab control is ACK (2 page) and the server type is IBH
            if (selectedTabPage.Equals("ACK") && ConfigurationServerForm.servConf.Server.ServerType.Equals(ServerTypes.IBH))
            {
                readACKFromIBH();
            }
            else if (selectedTabPage.Equals("S7Direct ACK") && ConfigurationServerForm.servConf.Server.ServerType.Equals(ServerTypes.S7Direct))
            {
                readEthernetS7();
            }
            else if(selectedTabPage.Equals("S7Direct Read/Write") && ConfigurationServerForm.servConf.Server.ServerType.Equals(ServerTypes.S7Direct))
            {
                readFromDBS7Direct();
            }
            else 
            {
                readValueFromIBH();
            }
        }

        private static string convertValueToString(object opcValue)
        {
            string opcString = null;

            try
            {
                if (opcValue != null)
                {
                    if (opcValue.GetType().Equals(typeof(bool)))
                    {
                        //opcString = Convert.ToString(opcValue);
                        opcString = (bool)opcValue ? "1" : "0";
                    }
                    else if (opcValue.GetType().Equals(typeof(byte)))
                    {
                        opcString = Convert.ToString(opcValue);
                    }
                    else if (opcValue.GetType().Equals(typeof(sbyte)))
                    {
                        opcString = Convert.ToString(opcValue);
                    }
                    else if (opcValue.GetType().Equals(typeof(UInt16)))
                    {
                        opcString = Convert.ToString(opcValue);
                    }
                    else if (opcValue.GetType().Equals(typeof(Int16)))
                    {
                        opcString = Convert.ToString(opcValue);
                    }
                    else if (opcValue.GetType().Equals(typeof(UInt32)))
                    {
                        opcString = Convert.ToString(opcValue);
                    }
                    else if (opcValue.GetType().Equals(typeof(Int32)))
                    {
                        opcString = Convert.ToString(opcValue);
                    }
                    else if (opcValue.GetType().Equals(typeof(float)))
                    {
                        opcString = Convert.ToString(opcValue);
                    }
                    else if (opcValue.GetType().Equals(typeof(double)))
                    {
                        opcString = Convert.ToString(opcValue);
                    }
                    else if (opcValue.GetType().Equals(typeof(string)))
                    {
                        opcString = Convert.ToString(opcValue);
                    }
                    else if (opcValue.GetType().Equals(typeof(DateTime)))
                    {
                        //opcString = Convert.ToString(opcValue);
                        opcString = ((DateTime)opcValue).ToString("yyyy-MM-dd HH:mm:ss.fff", CultureInfo.InvariantCulture);
                    }
                    else if (opcValue.GetType().Equals(typeof(bool[])))
                    {
                        string data = "";

                        foreach (bool value in (bool[])opcValue)
                            data += ((bool)value ? "1" : "0") + "|";

                        opcString = data.Substring(0, data.Length - 1);
                    }
                    else if (opcValue.GetType().Equals(typeof(byte[])))
                    {
                        string data = "";

                        foreach (byte value in (byte[])opcValue)
                            data += Convert.ToString(value) + "|";

                        opcString = data.Substring(0, data.Length - 1);
                    }
                    else if (opcValue.GetType().Equals(typeof(sbyte[])))
                    {
                        string data = "";

                        foreach (sbyte value in (sbyte[])opcValue)
                            data += Convert.ToString(value) + "|";

                        opcString = data.Substring(0, data.Length - 1);
                    }
                    else if (opcValue.GetType().Equals(typeof(UInt16[])))
                    {
                        string data = "";

                        foreach (UInt16 value in (UInt16[])opcValue)
                            data += Convert.ToString(value) + "|";

                        opcString = data.Substring(0, data.Length - 1);
                    }
                    else if (opcValue.GetType().Equals(typeof(Int16[])))
                    {
                        string data = "";

                        foreach (Int16 value in (Int16[])opcValue)
                            data += Convert.ToString(value) + "|";

                        opcString = data.Substring(0, data.Length - 1);
                    }
                    else if (opcValue.GetType().Equals(typeof(UInt32[])))
                    {
                        string data = "";

                        foreach (UInt32 value in (UInt32[])opcValue)
                            data += Convert.ToString(value) + "|";

                        opcString = data.Substring(0, data.Length - 1);
                    }
                    else if (opcValue.GetType().Equals(typeof(Int32[])))
                    {
                        string data = "";

                        foreach (Int32 value in (Int32[])opcValue)
                            data += Convert.ToString(value) + "|";

                        opcString = data.Substring(0, data.Length - 1);
                    }
                    else if (opcValue.GetType().Equals(typeof(float[])))
                    {
                        string data = "";

                        foreach (float value in (float[])opcValue)
                            data += Convert.ToString(value) + "|";

                        opcString = data.Substring(0, data.Length - 1);
                    }
                    else if (opcValue.GetType().Equals(typeof(double[])))
                    {
                        string data = "";

                        foreach (double value in (double[])opcValue)
                            data += Convert.ToString(value) + "|";

                        opcString = data.Substring(0, data.Length - 1);
                    }
                    else if (opcValue.GetType().Equals(typeof(string[])))
                    {
                        string data = "";

                        foreach (string value in (string[])opcValue)
                            data += Convert.ToString(value) + "|";

                        opcString = data.Substring(0, data.Length - 1);
                    }
                    else if (opcValue.GetType().Equals(typeof(DateTime[])))
                    {
                        string data = "";

                        foreach (DateTime value in (DateTime[])opcValue)
                            //data += Convert.ToString(value) + "|";
                            data += ((DateTime)value).ToString("yyyy-MM-dd HH:mm:ss.fff", CultureInfo.InvariantCulture) + "|";

                        opcString = data.Substring(0, data.Length - 1);
                    }
                    else
                    {
                        opcString = Convert.ToString(opcValue);
                    }
                }
                else
                {
                    // throw the exception
                    throw new Exception("Unknown data type");
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Conversion error: " + ex.Message);
            }

            return opcString;
        }

        private static object convertStringToValue(string opcString, Type opcType)
        {
            object opcValue = null;

            try
            {
                // get the value data type
                if (opcType.Equals(typeof(bool)))
                {
                    opcValue = opcString.Equals("1") ? true : false;
                }
                else if (opcType.Equals(typeof(byte)))
                {
                    opcValue = Convert.ToByte(opcString);
                }
                else if (opcType.Equals(typeof(sbyte)))
                {
                    opcValue = Convert.ToSByte(opcString);
                }
                else if (opcType.Equals(typeof(UInt16)))
                {
                    opcValue = Convert.ToUInt16(opcString);
                }
                else if (opcType.Equals(typeof(Int16)))
                {
                    opcValue = Convert.ToInt16(opcString);
                }
                else if (opcType.Equals(typeof(UInt32)))
                {
                    opcValue = Convert.ToUInt32(opcString);
                }
                else if (opcType.Equals(typeof(Int32)))
                {
                    opcValue = Convert.ToInt32(opcString);
                }
                else if (opcType.Equals(typeof(float)))
                {
                    opcValue = Convert.ToSingle(opcString);
                }
                else if (opcType.Equals(typeof(double)))
                {
                    opcValue = Convert.ToDouble(opcString);
                }
                else if (opcType.Equals(typeof(string)))
                {
                    opcValue = Convert.ToString(opcString);
                }
                else if (opcType.Equals(typeof(DateTime)))
                {
                    opcValue = Convert.ToDateTime(opcString);
                }
                else if (opcType.Equals(typeof(bool[])))
                {
                    List<bool> array = new List<bool>();

                    foreach (string value in opcString.Split('|'))
                        //array.Add(Convert.ToBoolean(value));
                        array.Add(value.Equals("1") ? true : false);

                    opcValue = array.ToArray<bool>();
                }
                else if (opcType.Equals(typeof(byte[])))
                {
                    List<byte> array = new List<byte>();

                    foreach (string value in opcString.Split('|'))
                        array.Add(Convert.ToByte(value));

                    opcValue = array.ToArray<byte>();
                }
                else if (opcType.Equals(typeof(sbyte[])))
                {
                    List<sbyte> array = new List<sbyte>();

                    foreach (string value in opcString.Split('|'))
                        array.Add(Convert.ToSByte(value));

                    opcValue = array.ToArray<sbyte>();
                }
                else if (opcType.Equals(typeof(UInt16[])))
                {
                    List<UInt16> array = new List<UInt16>();

                    foreach (string value in opcString.Split('|'))
                        array.Add(Convert.ToUInt16(value));

                    opcValue = array.ToArray<UInt16>();
                }
                else if (opcType.Equals(typeof(Int16[])))
                {
                    List<Int16> array = new List<Int16>();

                    foreach (string value in opcString.Split('|'))
                        array.Add(Convert.ToInt16(value));

                    opcValue = array.ToArray<Int16>();
                }
                else if (opcType.Equals(typeof(UInt32[])))
                {
                    List<UInt32> array = new List<UInt32>();

                    foreach (string value in opcString.Split('|'))
                        array.Add(Convert.ToUInt32(value));

                    opcValue = array.ToArray<UInt32>();
                }
                else if (opcType.Equals(typeof(Int32[])))
                {
                    List<Int32> array = new List<Int32>();

                    foreach (string value in opcString.Split('|'))
                        array.Add(Convert.ToInt32(value));

                    opcValue = array.ToArray<Int32>();
                }
                else if (opcType.Equals(typeof(float[])))
                {
                    List<float> array = new List<float>();

                    foreach (string value in opcString.Split('|'))
                        array.Add(Convert.ToSingle(value));

                    opcValue = array.ToArray<float>();
                }
                else if (opcType.Equals(typeof(double[])))
                {
                    List<double> array = new List<double>();

                    foreach (string value in opcString.Split('|'))
                        array.Add(Convert.ToDouble(value));

                    opcValue = array.ToArray<double>();
                }
                else if (opcType.Equals(typeof(string[])))
                {
                    List<string> array = new List<string>();

                    foreach (string value in opcString.Split('|'))
                        array.Add(Convert.ToString(value));

                    opcValue = array.ToArray<string>();
                }
                else if (opcType.Equals(typeof(DateTime[])))
                {
                    List<DateTime> array = new List<DateTime>();

                    foreach (string value in opcString.Split('|'))
                        array.Add(Convert.ToDateTime(value));

                    opcValue = array.ToArray<DateTime>();
                }
                else
                {
                    throw new Exception("Unrecognized data type");
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Conversion error, value: '" + opcString + "', type: '" + opcType + "': " + ex.Message);
            }

            return opcValue;
        }

        private void writeACKtoIBH()
        {
            try
            {
                //verify the string inserted by user
                switch (textBoxWriteValue.Text)
                {
                    case "false":
                    case "False":
                        {
                            textBoxWriteValue.Text = "0";
                            break;
                        }
                    case "true":
                    case "True":
                        {
                            textBoxWriteValue.Text = "1";
                            break;
                        }
                }

                //foreach plcId
                foreach (string key in dict.Keys)
                {
                    //write the value in the text box of the writer to the address of the PLC
                    address = key + ".Generic." + key + "197b003_AckAlarm";
                    
                    ServerConnection.daClient.Write(address, convertStringToValue(textBoxWriteValue.Text, (Type)textBoxDataType.Tag));

                    Logging.writeLog(Program.logPath, "Writing ack to IBH", " Value :" + textBoxWriteValue.Text + " is written to" + key + " into " + address,"");
                }
            }catch(Exception ex)
            {
                Logging.writeLog(Program.errorPath, "writing error to IBH", ex.Message, "");
                writeButton.BackColor = Color.Red;
                return;
            }
            
        }

        private void writeValueToIBH()
        {
            //write a particulare value to an address to the IBH
            try
            {
                if (address != "" && address != null)
                {
                    // write tag nodes
                    ServerConnection.daClient.Write(address, convertStringToValue(textBoxWriteValue.Text, (Type)textBoxDataType.Tag));

                    Logging.writeLog(Program.logPath, "Writing value to IBH", " Value :" + textBoxWriteValue.Text + " is written to " + address, "");
                }
            }
            catch (Exception ex)
            {
                Logging.writeLog(Program.errorPath, "writing status", ex.Message, "");
                writeButton.BackColor = Color.Red;
                return;
            }
        }

        private void writeButton_Click(object sender, EventArgs e)
        {
            try
            {
                //if the selected page is ACK and the server type is IBH
                if (selectedTabPage.Equals("ACK") && ConfigurationServerForm.servConf.Server.ServerType.Equals(ServerTypes.IBH))
                {
                    writeACKtoIBH();
                    
                }else if (selectedTabPage.Equals("S7Direct ACK") && ConfigurationServerForm.servConf.Server.ServerType.Equals(ServerTypes.S7Direct))
                {
                    writeEthernetS7();
                }
                else if (selectedTabPage.Equals("S7Direct Read/Write") && ConfigurationServerForm.servConf.Server.ServerType.Equals(ServerTypes.S7Direct))
                {
                    writeToDBS7Direct();
                }
                else
                {
                    writeValueToIBH();
                }
            }catch(Exception ex)
            {
                Logging.writeLog(Program.errorPath, "writing value", ex.Message, "");
                return;
            }
        }
    }
}
