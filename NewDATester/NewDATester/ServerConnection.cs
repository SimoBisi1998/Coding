using AccessDBCommLibrary;
using BUI_XML;
using LoggingLib;
using NewDATester;
using PLCComDA;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Data;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading;
using System.Threading.Tasks;
using System.Windows.Forms;
using TesterDA;

namespace DATester
{
    class ServerConnection
    {
        public static Boolean DARunning = false;
        public static Boolean DAConnected = false;
        public static Boolean mainEventClosed = false;
        public static Siemens.Opc.Da.Server daClient;
        public ShowTags st;
        public EventHandler threadInterrupted;
        public Thread secondFormThread;
        private static DB_Management dbManagement;
        private static TagRegex tagRegex;
        private static XML_Processing xmlProc;
        public static CPUList cpulist;
        public static Dictionary<string, BufferItem> dataBuffer;

        public static void checkServerStatus()
        {
            //check if the process in the config.xml is empty
            if (ServerConfig.process != "")
            {
                //get che array of processes that are currently running on the localhost 
                Process[] processes = Process.GetProcessesByName(ServerConfig.process);
                if (processes.Length == 0)
                {
                    Logging.writeLog(Program.logPath, "statusCheck", "IBHOPC DA not running, waiting for reconnection..", "");
                }
                else
                {
                    //if the IBHOPC is found, so try to connect to the OPC SERVER
                    try
                    {
                        DARunning = true;

                        //create instance of daClient
                        daClient = new Siemens.Opc.Da.Server();

                        //connection to db;
                        connectToDatabase();

                        Logging.writeLog(Program.logPath, "statusCheck", "OPC DA process running: '" + processes[0].ProcessName + "'", "");
                    }
                    catch (Exception ex)
                    {
                        Logging.writeLog(Program.errorPath, "connection to IBH DA", ex.Message, "");
                    }
                }
            }
        }

        public static void connectToDatabase()
        {
            try
            {
                //create new instance of dbManagement
                dbManagement = new DB_Management(ConfigurationServerForm.servConf.Database.Provider, ConfigurationServerForm.servConf.Database.Path);

                //connection to db
                dbManagement.connectToDB();
            }
            catch (Exception e)
            {
                Logging.writeLog(Program.errorPath, "connection to database", "Error reading from database: ", e.Message);
                ConfigurationServerForm.exceptionText.Text = "Failed to connect to the database";
            }


        }

        public async void connectionToIBHDAAsync()
        {
            try
            {
                //checkStatus of the IBHOPC
                checkServerStatus();

                await labelLoading("Loading configuration..", 15);

                //initilization
                initialization();

                await labelLoading("Reading parameters..", 40);

                //load CPUList
                loadCPUList();

                if (ConfigurationServerForm.servConf.Server.ServerType.Equals(ServerTypes.IBH))
                {
                    //IBH communication
                    if (DARunning && !mainEventClosed)
                    {
                        //if server DA is running, try to connect to it
                        daClient.Connect(ServerConfig.protocol + ServerConfig.address + ServerConfig.endpoint);

                        if(DARunning && daClient.isConnected())
                        {
                            //set connected to true
                            DAConnected = true;

                            await labelLoading("Reading from database..", 65);

                            //read from database
                            readFromDatabase();

                            await labelLoading("Connection to IBHDA..", 100);

                            //read tags and them values from OPC
                            readFromOPC();

                            try
                            {

                                //build new showtags's object
                                st = new ShowTags();

                                //starting new thread to listen new events from the ShowTags page
                                secondFormThread = new Thread(st.cyclicOnTree);
                                secondFormThread.Start();

                                //start dialog of the list with the tags
                                st.ShowDialog();

                                //bool to trigger the event of closing form
                                mainEventClosed = true;
                            }
                            catch (Exception ex)
                            {
                                Logging.writeLog(Program.errorPath, "connection status", "OPC DA client is disconnecting..", ex.Message);
                                ConfigurationServerForm.exceptionText.Text = ex.Message;
                            }
                        }
                    }

                }else
                {
                    //S7Direct communication
                    await labelLoading("Connecting to the CPU..", 100);
                }
                if (!mainEventClosed)
                {
                    try
                    {
                        //build new showtags's object
                        st = new ShowTags();

                        //starting new thread to listen new events from the ShowTags page
                        secondFormThread = new Thread(st.cyclicOnTree);
                        secondFormThread.Start();

                        //start dialog of the list with the tags
                        st.ShowDialog();

                        //bool to trigger the event of closing form
                        mainEventClosed = true;
                    }
                    catch (Exception ex)
                    {
                        Logging.writeLog(Program.errorPath, "connection status", "CPUs are not responding..", ex.Message);
                        ConfigurationServerForm.exceptionText.Text = ex.Message;
                    }
                }
                if (mainEventClosed)
                {
                    //close the dialog
                    st.Close();
                    try
                    {
                        //interrupt the execution of showTags's thread
                        secondFormThread.Interrupt();

                        //waiting for the thread closing application
                        secondFormThread.Join();

                        // Notifica che il thread secondario è stato completato
                        notifyClosedThread();

                        return;
                    }
                    catch (ThreadInterruptedException th)
                    {
                        Logging.writeLog(Program.errorPath, "interrupting thread", th.Message, "");
                    }
                }
            }
            catch (Exception ex)
            {
                DARunning = false;

                Logging.writeLog(Program.errorPath, "Connection", "OPC DA server connection failed", ex.Message);
            }
            return;
        }

        public void readFromOPC()
        {
            // create a new list of opc tags with prefix
            List<string> variables = new List<string>();

            //extract the keys from the dataBuffer
            List<string> tags = dataBuffer.Keys.ToList<string>();

            foreach (string tag in tags)
                if (ConfigurationServerForm.servConf.Server.ServerType.Equals(ServerTypes.Siemens))
                    variables.Add(tag);
                else
                    variables.Add(dataBuffer[tag].TagPrefix + tag.Replace('.', '-'));

            //create opcBuffer,opcStatus and the collection of all the items that i want to read from OPC
            object[] opcBuffer = new object[variables.Count];
            int[] opcStatus = new int[variables.Count];
            StringCollection opcTags = new StringCollection();

            opcTags.AddRange(variables.ToArray<string>());

            //read from OPC server the list of tags that are present inside the opcTags
            bool readingSuccess = daClient.Read(opcTags, out opcBuffer, out opcStatus);
        }

        protected virtual void notifyClosedThread()
        {
            //notify main thread when the second thread is closed
            threadInterrupted?.Invoke(this, EventArgs.Empty);
        }

        public async Task labelLoading(string message, int value)
        {
            await Task.Delay(1000);

            ConfigurationServerForm.textLoading.Text = message;
            ConfigurationServerForm.newProgressBar.Value = value;
        }

        public void initialization()
        {
            // create a new tag regular expression instance
            tagRegex = new TagRegex();

            // create a xml processing instance
            xmlProc = new XML_Processing();
        }

        private static void loadCPUList()
        {
            //load the cpuList from the cpuList.xml
            StreamReader sr = null;
            try
            {
                if (File.Exists(Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "plcList.xml")))
                {
                    sr = new StreamReader(Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "plcList.xml"));
                    cpulist = xmlProc.deserializeFromXML<CPUList>(sr.ReadToEnd());
                }
            }
            catch (Exception ex)
            {
                Logging.writeLog(Program.errorPath, "deserializing plc list", "Error serializing ", ex.Message);
            }
        }

        public static Dictionary<String, BufferItem> readFromDatabase()
        {

            // create a new instance of the databuffer
            dataBuffer = new Dictionary<string, BufferItem>();

            DB_Result dbr = dbManagement.executeQuery("SELECT * FROM Data WHERE Data.COM LIKE 'opc'", "Data");
            if (dbr.queryResultState)
            {
                foreach (DataRow dataRow in dbr.dataSet.Tables["Data"].Rows)
                {
                    // create a new tag buffer item instance
                    BufferItem item = null;

                    // process the tag name
                    string dbTagName = dataRow["Addr"].ToString();
                    string dbDescription = dataRow["Descr"].ToString();
                    string dbUnitMeasure = dataRow["UM"].ToString();
                    string dbScaling = dataRow["Scal"].ToString();
                    string dbMin = dataRow["Min"].ToString();
                    string dbMax = dataRow["Max"].ToString();

                    Match tagMatches = tagRegex.processTag(dbTagName);
                    string dbPlcCode = tagMatches.Groups["plcCode"].Value.ToString();
                    string dbNumber = tagMatches.Groups["dbNumber"].Value.ToString();
                    string dbDataType = tagMatches.Groups["dataType"].Value.ToString();
                    string dbAddress = tagMatches.Groups["dbAddress"].Value.ToString();
                    string dbBit = tagMatches.Groups["dbBit"].Value.ToString();
                    string dbComment = tagMatches.Groups["dbComment"].Value.ToString();

                    try
                    {
                        // compute the tag prefix 
                        string prefix = "";
                        switch (ConfigurationServerForm.servConf.Server.ServerType)
                        {
                            case ServerTypes.Siemens:
                                {
                                    prefix = "";
                                    break;
                                }

                            case ServerTypes.IBH:
                                {
                                    prefix = dbPlcCode + ".Generic.";
                                    break;
                                }
                        }
                        // process the tag type
                        switch (dataRow["Var"].ToString())
                        {
                            case "1":   // numeric set point
                            case "4":
                                {
                                    item = new BufferItem(prefix, dbPlcCode, dbNumber, dbDataType, dbAddress, dbBit, dbComment, dbDescription, dbUnitMeasure, dbScaling, dbMin, dbMax, ItemTypes.SetPoint);
                                    break;
                                }

                            case "2":   // numeric actual
                                {
                                    item = new BufferItem(prefix, dbPlcCode, dbNumber, dbDataType, dbAddress, dbBit, dbComment, dbDescription, dbUnitMeasure, dbScaling, dbMin, dbMax, ItemTypes.Actual);
                                    break;
                                }

                            case "3":   // logic variable
                                {
                                    if (Convert.ToInt32(dbAddress) % 2 == 0)
                                        item = new BufferItem(prefix, dbPlcCode, dbNumber, dbDataType, dbAddress, dbBit, dbComment, dbDescription, dbUnitMeasure, dbScaling, dbMin, dbMax, ItemTypes.Command);
                                    else
                                        item = new BufferItem(prefix, dbPlcCode, dbNumber, dbDataType, dbAddress, dbBit, dbComment, dbDescription, dbUnitMeasure, dbScaling, dbMin, dbMax, ItemTypes.Display);
                                    break;
                                }

                            case "10":  // buffer
                                {
                                    item = new BufferItem(prefix, dbPlcCode, dbNumber, dbDataType, dbAddress, dbBit, dbComment, dbDescription, dbUnitMeasure, dbScaling, dbMin, dbMax, ItemTypes.Buffer);
                                    break;
                                }

                            case "11":  // string
                                {
                                    item = new BufferItem(prefix, dbPlcCode, dbNumber, dbDataType, dbAddress, dbBit, dbComment, dbDescription, dbUnitMeasure, dbScaling, dbMin, dbMax, ItemTypes.String);
                                    break;
                                }

                            default:
                                {
                                    break;
                                }
                        }

                        // finally add the new item to the data buffer
                        if (!dataBuffer.ContainsKey(dbTagName))
                            dataBuffer.Add(dbTagName, item);
                    }
                    catch (Exception e)
                    {
                        Logging.writeLog(Program.errorPath, "reading data from db", "Error during the reading from db:", e.Message);
                    }
                }
            }
            return dataBuffer;
        }
    }
}
