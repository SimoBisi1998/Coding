using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml;
using System.Xml.Schema;
using System.Xml.Serialization;
using System.ComponentModel;



namespace PLCComDA
{
    [XmlRoot("ServiceConfiguration", IsNullable = false), TypeConverter(typeof(ExpandableObjectConverter))]
    public class ServiceConfig
    {
        // class data
        private bool autoStart;
        private string timeStamp;
        private Database database;
        private Server server;
        private string delay;



        // class constructor
        public ServiceConfig()
        {
            ;
        }



        // class properties
        [XmlAttribute("AutoStart")]
        public bool AutoStart { get { return autoStart; } set { autoStart = value; } }

        [XmlAttribute("TimeStamp")]
        public string TimeStamp { get { return timeStamp; } set { timeStamp = value; } }

        [XmlElement("Database", typeof(Database), IsNullable = false), TypeConverter(typeof(ExpandableObjectConverter))]
        public Database Database { get { return database; } set { database = value; } }

        [XmlElement("Server", typeof(Server), IsNullable = false), TypeConverter(typeof(ExpandableObjectConverter))]
        public Server Server { get { return server; } set { server = value; } }

        [XmlAttribute("Delay")]
        public string Delay { get { return delay; } set { delay = value; } }
    }



    public class Database
    {
        // class data
        private string provider;
        private string path;



        // class constructor
        public Database()
        {
            ;
        }



        // class properties
        [XmlAttribute("Provider")]
        public string Provider { get { return provider; } set { provider = value; } }

        [XmlAttribute("Path")]
        public string Path { get { return path; } set { path = value; } }
    }



    public class Server
    {
        // class data
        private string protocol;
        private string address;
        private string endPoint;
        private string process;
        private ServerTypes serverType;



        // class constructor
        public Server()
        {
            ;
        }



        // class properties
        [XmlAttribute("Protocol")]
        public string Protocol { get { return protocol; } set { protocol = value; } }

        [XmlAttribute("Address")]
        public string Address { get { return address; } set { address = value; } }

        [XmlAttribute("EndPoint")]
        public string EndPoint { get { return endPoint; } set { endPoint = value; } }

        [XmlAttribute("Process")]
        public string Process { get { return process; } set { process = value; } }

        [XmlAttribute("ServerType")]
        public ServerTypes ServerType { get { return serverType; } set { serverType = value; } }
    }

    public enum ServerTypes
    {
        Siemens = 0,
        IBH = 1,
        S7Direct = 2
    }
}
