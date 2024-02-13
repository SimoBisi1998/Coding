using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Serialization;

namespace NewDATester
{
    [XmlRoot("CPUList",IsNullable = false)]
    public class CPUList
    {
        //class variable
        public List<PLC> cpu;

        //element of the xml
        [XmlElement("PLC",IsNullable = false)]
        public List<PLC> Cpu { get { return cpu; } set { cpu = value; } }
    }

    public class PLC
    {
        //class data
        public string plcId;
        public string ipAddress;

        [XmlAttribute("id")]
        public string PlcId { get { return plcId; } set { plcId = value; } }

        [XmlAttribute("ipAddress")]
        public string IpAddress { get { return ipAddress; } set { ipAddress = value; } }
    }

    
}
