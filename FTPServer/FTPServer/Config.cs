using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Sockets;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Serialization;

namespace FTPServer
{
    [XmlRoot("Config",IsNullable =false)]
    public class Config
    {
        [XmlElement("CommandList")]
        public List<CommandList> ftpCommand { get; set; }
    }

    public class CommandList
    {
        [XmlElement("USER")]
        public USERCommand USER { get; set; }

        [XmlElement("PASS")]
        public PASSCommand PASS { get; set; }

        [XmlElement("STOR")]
        public STORCommand STOR { get; set; }

        [XmlElement("CWD")]
        public CWDCommand CWD { get; set; }

        [XmlElement("PWD")]
        public PWDCommand PWD { get; set; }

        [XmlElement("RETR")]
        public RETRCommand RETR { get; set; }

        [XmlElement("LIST")]
        public LISTCommand LIST { get; set; }

        [XmlElement("TYPEI")]
        public TYPEICommand TYPEI { get; set; }

        [XmlElement("TYPEA")]
        public TYPEACommand TYPEA { get; set; }

        [XmlElement("RMD")]
        public RMDCommand RMD { get; set; }

        [XmlElement("DELE")]
        public DELECommand DELE { get; set; }

        [XmlElement("PORT")]
        public PORTCommand PORT { get; set; }

        [XmlElement("RNFR")]
        public RNFRCommand RNFR { get; set; }

        [XmlElement("RNTO")]
        public RNTOCommand RNTO { get; set; }

        [XmlElement("FEAT")]
        public FEATCommand FEAT { get; set; }

        [XmlElement("SYST")]
        public SYSTCommand SYST { get; set; }

        [XmlElement("PASV")]
        public PASVCommand PASV { get; set; }

        [XmlElement("OPTSUTF8ON")]
        public OPTSCommand OPTSUTF8ON { get; set; }

        [XmlElement("MKD")]
        public MKDCommand MKD { get; set; }
    }
}