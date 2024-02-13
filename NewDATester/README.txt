DA CLIENT & S7 CLIENT


Its a client application that you can install on your desktop using the proper installer in the same folder. Its a bidirectional communication from a Client DA (Data Access) to a IBH OPC Server that is an internal service that is running a OPC DA Server. You can write and read values from the PLC (CPU S7300). 


There are two ways of communication between client and server in this sw:


-A client DA can read from a OPC server the list of tags that are mapped on MDB file (Microsoft Database).


-A client S7 using the API of S7.NET to read bytes from the memory of the PLC and writing inside it.




WHAT YOU WILL FIND IN THE FOLDER


There is a config file (its a xml file) which is deserialized from the program. This name of this file is “config.xml” and these are the fields that you can see inside:




<?xml version="1.0" encoding="iso-8859-1"?>
<ServiceConfiguration xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" AutoStart="true" Delay="0">
  <Database Provider="Provider=Microsoft.Jet.OLEDB.4.0;Data Source=" Path="C:\Users\Admin\Desktop\PLCCom\Data\MachineDataIO.mdb" />
  <Server Protocol="opcda://" Address="localhost/" EndPoint="IBHSoftec.IBHOPC.DA.1" Process="IBHOPC" ServerType="S7Direct" />
</ServiceConfiguration>




Server parameters:


-Protocol (opcda://)
-Address (always localhost because we don’t have socket tcp/ip for the IBH DA)
-Service (IBHOPC)
-Endpoint (this is the name of the OPC DA using by us from Siemens)
-ServerType (this is the field where you can set the type of communication that you want)


In the server type you can set:
-”IBHOPC” to communicate with the internal OPC DA Server
-”S7Direct” to establish an ethernet connection between the client and the CPU 


You will also find another xml file (the name is plcList.xml) where you can write all the CPUs which you’re communicating with.


<?xml version="1.0" encoding="utf-16"?>
<CPUList xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
   <PLC id="MAS" ipAddress="172.17.5.2" />
   <PLC id="01S" ipAddress="172.17.5.11" />
   <PLC id="02S" ipAddress="172.17.5.12" />
   <PLC id="03S" ipAddress="172.17.5.13" />
   <PLC id="04S" ipAddress="172.17.5.14" />
   <PLC id="05S" ipAddress="172.17.5.15" />
   <PLC id="06S" ipAddress="172.17.5.16" />
   <PLC id="07S" ipAddress="172.17.5.17" />
   <PLC id="08S" ipAddress="172.17.5.18" />
   <PLC id="09S" ipAddress="172.17.5.19" />
   <PLC id="10S" ipAddress="172.17.5.20" />
   <PLC id="1UW" ipAddress="172.17.5.31" />
   <PLC id="REW" ipAddress="172.17.5.37" />
</CPUList>


The structure is this one. You have to set the name of the PLC and the IP address of it








Database configuration:


-Provider (this is the driver that allows you to connect to the MDB file (Microsoft Database)
-Path (this is the path where the sw can find the .mdb file)




The second way of communicating with the CPU (S7Direct), will manipulate directly bytes for each data type you want to read. You need to set like i told you the S7Direct in the Server Type of the config.xml and then after starting application you will see a particular UI.


IN this UI, you will se a tab container, where you can write the address of the PLC, datatype,length and if you want also the bit if the data type is bool.


So you can read and write:


-Word
-Dword
-Int16 
-Int32
-Real/float
-String
-Dint
-Double