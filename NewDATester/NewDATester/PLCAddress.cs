using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DATester
{ 
    public class PLCAddress
    {
        public string plcAddress;
        public string dataType;
        public string datablock;

        public string PlcAddress { get { return plcAddress; } set { plcAddress = value; } }

        public string DataType { get { return dataType; } set { dataType = value; } }

        public string Datablock { get { return datablock; } set { datablock = value; } }


        public PLCAddress(string plcAddress, string dataType,string datablock)
        {
            this.plcAddress = plcAddress;
            this.dataType = dataType;
            this.datablock = datablock;
        }
    }
}
