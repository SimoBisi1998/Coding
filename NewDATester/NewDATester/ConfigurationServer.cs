using BUI_XML;
using DATester;
using NewDATester;
using PLCComDA;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Security.AccessControl;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace TesterDA
{
    public partial class ConfigurationServerForm : Form
    {
        private static XML_Processing xmlProc;
        public static Label textLoading;
        public static ProgressBar newProgressBar;
        public static Label exceptionText;
        public ServiceConfig serviceConfig;
        public static ServiceConfig servConf;


        public ConfigurationServerForm()
        {
            InitializeComponent();

            textLoading = loadingLabel;
            newProgressBar = progressBar;
            exceptionText = exceptionLabel;

            //create log and error file
            createLogFile();

            //load service config deserializing XML
            loadServiceConfig();

            //set all the parameters
            setParameters();
        }

        public void createLogFile()
        {
            //error log
            if (!File.Exists(Program.errorPath)) using (FileStream fs = new FileStream(Program.errorPath, FileMode.CreateNew)) { }
            else
            {
                File.Delete(Program.errorPath);
                using (FileStream fs = new FileStream(Program.errorPath, FileMode.CreateNew)) { };
            }
            if (!File.Exists(Program.logPath)) using (FileStream fs = new FileStream(Program.logPath, FileMode.CreateNew)) { }
            else
            {
                File.Delete(Program.logPath);
                using (FileStream fs = new FileStream(Program.logPath, FileMode.CreateNew)) { };
            }
        }

        private void connectButton_Click_1Async(object sender, EventArgs e)
        {
            ServerConnection sc = new ServerConnection();
            sc.connectionToIBHDAAsync();

            //connect an event handler of the interruption of thread
            sc.threadInterrupted += (s, ev) =>
            {
                if (this.InvokeRequired)
                {
                    this.Invoke((MethodInvoker)delegate
                    {
                        this.Close();
                    });
                }
                else
                {
                    this.Close();
                }
            };
        }

        private static void loadServiceConfig()
        {
            StreamReader sr = null;
            xmlProc = new XML_Processing();

            try
            {
                if (File.Exists(Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "config.xml")))
                {
                    // create a new stream reader to read source xml file
                    sr = new StreamReader(Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "config.xml"));

                    // parse xml and get the object instance back
                    servConf = xmlProc.deserializeFromXML<ServiceConfig>(sr.ReadToEnd());
                }
                else
                    throw new Exception("Service configuration file not found");
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (sr != null)
                    sr.Close();
            }
        }

        public void setParameters()
        {
            //set server's parameters
            ServerConfig.protocol = servConf.Server.Protocol;
            ServerConfig.address = servConf.Server.Address;
            ServerConfig.endpoint = servConf.Server.EndPoint;
            ServerConfig.process = servConf.Server.Process;
            ServerConfig.provider = servConf.Database.Provider;
            ServerConfig.path = servConf.Database.Path;
            ServerConfig.servertype = servConf.Server.ServerType.ToString();

            //set UI parameters
            serverProtocol.Text = ServerConfig.protocol;
            serverAddress.Text = ServerConfig.address;
            serverEndpoint.Text = ServerConfig.endpoint;
            serverProcess.Text = ServerConfig.process;
            serverProvider.Text = ServerConfig.provider;
            serverPath.Text = ServerConfig.path;
            serverType.Text = ServerConfig.servertype;
        }
    }
}
