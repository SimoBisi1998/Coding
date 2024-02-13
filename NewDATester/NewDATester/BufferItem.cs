using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;



namespace PLCComDA
{
    public class BufferItem
    {
        // class data
        private string tagPrefix;
        private string plcCode;
        private string dbNumber;
        private string dataType;
        private string dbAddress;
        private string dbBit;
        private string dbComment;
        private string dbDescription;
        private string dbUnitMeasure;
        private string dbScaling;
        private string dbMin;
        private string dbMax;
        private ItemTypes itemType;
        private string itemDbValue;
        private string itemOpcValue;
        private bool updateDbFromOpc;
        private bool updateOpcFromDb;
        private Type tagType;



        // class constructor
        public BufferItem(string prefix, string plccode, string dbnumber, string datatype, string dbaddress, string dbbit, string dbcomment, string dbdescription, string dbunitmeasure, string dbscaling, string dbmin, string dbmax, ItemTypes type)
        {
            tagPrefix = prefix;
            plcCode = plccode;
            dbNumber = dbnumber;
            dataType = datatype;
            dbAddress = dbaddress;
            dbBit = dbbit;
            dbComment = dbcomment;
            dbDescription = dbdescription;
            dbUnitMeasure = dbunitmeasure;
            dbScaling = dbscaling;
            dbMin = dbmin;
            dbMax = dbmax;
            itemType = type;
            itemDbValue = "";
            itemOpcValue = "";
            updateDbFromOpc = false;
            updateOpcFromDb = false;
        }



        // class properties
        public string TagPrefix { get { return tagPrefix; } }
        public string PlcCode { get { return plcCode; } }
        public string DbNumber { get { return dbNumber; } }
        public string DataType {  get { return dataType; } }
        public string DbAddress { get { return dataType; } }
        public string DbBit { get { return dbBit; } }
        public string DbComment { get { return dbComment; } }
        public string DbDescription { get { return dbDescription; } }
        public string DbUnitMeasure {  get { return dbUnitMeasure; } }
        public string DbScaling { get { return dbScaling; } }
        public string DbMin { get { return dbMin; } }
        public string DbMax { get { return dbMax; } }
        public ItemTypes ItemType { get { return itemType; } }
        public string ItemDbValue { get { return itemDbValue; } set { itemDbValue = value; } }
        public string ItemOpcValue { get { return itemOpcValue; } set { itemOpcValue = value; } }
        public bool UpdateDbFromOpc { get { return updateDbFromOpc; } set { updateDbFromOpc = value; } }
        public bool UpdateOpcFromDb { get { return updateOpcFromDb; } set { updateOpcFromDb = value; } }
        public Type TagType { get { return tagType; } set { tagType = value; } }
    }



    public enum ItemTypes
    {
        SetPoint=1,
        Actual=2,
        Command=3,
        Display=4,
        Buffer=10,
        String=11
    }
}
