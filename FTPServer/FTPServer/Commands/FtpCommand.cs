using System;
using System.IO;
using System.Net.Sockets;
using System.Text;
using System.Threading.Tasks;

namespace FTPServer
{
    public interface FtpCommand
    {
        ByteWriter byteWriter { get; set; }
        NetworkStream command_socketStream { get; set; }
        string commandName { get; set; }
        Task ExecutingCommand();
    }

    public class CWDCommand : FtpCommand
    {
        public ByteWriter byteWriter { get; set; }
        public NetworkStream command_socketStream { get; set; }
        public string commandName { get; set; }
        public string path { get; set; }

        public CWDCommand() { }
        public CWDCommand(string commandName, string path, NetworkStream netStream)
        {
            this.commandName = commandName;
            this.path = path;
            this.command_socketStream = netStream;

            byteWriter = new ByteWriter();
        }
        public async Task ExecutingCommand()
        {
            try
            {
                Directory.SetCurrentDirectory(path);
                await byteWriter.convertAndWriteBytes("250 Request CWD ok\r\n");
                await ByteSender.SendResponse(command_socketStream, byteWriter);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error converting byte for the following command CWD: " + ex.Message);
            }
        }
    }

    public class DELECommand : FtpCommand
    {
        public ByteWriter byteWriter { get; set; }
        public NetworkStream command_socketStream { get; set; }
        public string commandName { get; set; }

        public string fileName { get; set; }

        public DELECommand() { }
        public DELECommand(string commandName, string fileToDelete, NetworkStream netStream)
        {
            this.commandName = commandName;
            this.fileName = fileToDelete;
            this.command_socketStream = netStream;

            byteWriter = new ByteWriter();
        }

        public async Task ExecutingCommand()
        {
            try
            {
                if (File.Exists(fileName))
                {
                    foreach (string f in Directory.GetFiles((string)Directory.GetCurrentDirectory()))
                    {
                        if (Path.GetFileName(f).Equals(fileName))
                        {
                            File.Delete(fileName);
                            string responseOK = "250 DELE Command successfull\r\n";
                            await byteWriter.convertAndWriteBytes(responseOK);

                            //sending bytes
                            await ByteSender.SendResponse(command_socketStream, byteWriter);

                            return;
                        }
                    }

                    string responseNotOK = "550 Could not delete file\r\n";
                    await byteWriter.convertAndWriteBytes(responseNotOK);

                    //sending bytes
                    await ByteSender.SendResponse(command_socketStream, byteWriter);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error executing the DELE command: " + ex.Message);
            }
        }
    }

    public class FEATCommand : FtpCommand
    {
            public ByteWriter byteWriter { get; set; }
            public NetworkStream command_socketStream { get; set; }
            public string commandName { get; set; }

            public FEATCommand() { }
            public FEATCommand(string commandName, NetworkStream networkStream)
            {
                this.commandName = commandName;
                this.command_socketStream = networkStream;

                byteWriter = new ByteWriter();
            }
            public async Task ExecutingCommand()
            {
                try
                {
                    await byteWriter.convertAndWriteBytes("211 - Features:\r\n"
                         + "MDTM\r\n" +
                         "MLST Type *; Size *; Modify *;\r\n" +
                         "REST STREAM\r\n" +
                         "SIZE\r\n" +
                         "211 End \r\n");

                    await ByteSender.SendResponse(command_socketStream, byteWriter);
                }
                catch (Exception ex)
                {
                    Console.WriteLine("Error during the conversion in bytes of FEAT: " + ex.Message);
                }
            }
    }

    public class MKDCommand : FtpCommand
    {
            public ByteWriter byteWriter { get; set; }
            public NetworkStream command_socketStream { get; set; }
            public string commandName { get; set; }
            public string fileName { get; set; }

            public MKDCommand() { }
            public MKDCommand(string commandName, string fileName, NetworkStream netStream)
            {
                this.commandName = commandName;
                this.fileName = fileName;
                this.command_socketStream = netStream;

                byteWriter = new ByteWriter();
            }
            public async Task ExecutingCommand()
            {
                try
                {
                    if (Directory.Exists(fileName))
                    {
                        await byteWriter.convertAndWriteBytes("550 Directory already exists\r\n");
                    }
                    else
                    {
                        Directory.CreateDirectory(Directory.GetCurrentDirectory() + "\\" + fileName);
                        await byteWriter.convertAndWriteBytes("257 " + fileName + " created\r\n");
                    }


                    //Send response
                    await ByteSender.SendResponse(command_socketStream, byteWriter);

                }
                catch (Exception ex)
                {
                    Console.WriteLine("Error during the creation of the directory for the MKD command:" + ex.Message);
                }
            }
    }

    public class OPTSCommand : FtpCommand
    {
            public string commandName { get; set; }
            public ByteWriter byteWriter { get; set; }
            public NetworkStream command_socketStream { get; set; }

            private Exception NotImplementedException()
            {
                throw new NotImplementedException();
            }

            public OPTSCommand() { }

            public OPTSCommand(string commandName, NetworkStream clientStream)
            {
                this.command_socketStream = clientStream;
                this.commandName = commandName;

                byteWriter = new ByteWriter();
            }

            public async Task ExecutingCommand()
            {
                try
                {
                    await byteWriter.convertAndWriteBytes("200 UTF8 set to on \r\n");

                    await ByteSender.SendResponse(command_socketStream, byteWriter);
                }
                catch (Exception ex)
                {
                    Console.WriteLine("Error executing 'OPTS UTF8 ON' command: " + ex.Message);
                }

            }
    }

    public class PASSCommand : FtpCommand
    {
        public ByteWriter byteWriter { get; set; }
        public NetworkStream command_socketStream { get; set; }
        public string commandName { get; set; }
            public PASSCommand(){}
            public PASSCommand(string commandName, NetworkStream netStream)
            {
                this.commandName = commandName;
                this.command_socketStream = netStream;

                byteWriter = new ByteWriter();
            }
            public async Task ExecutingCommand()
            {
                await byteWriter.convertAndWriteBytes("230 User logged in \r\n");

                await ByteSender.SendResponse(command_socketStream, byteWriter);
            }
    }

    public class PASVCommand : FtpCommand
    {
            public ByteWriter byteWriter { get; set; }
            public NetworkStream command_socketStream { get; set; }
            public string commandName { get; set; }

            public string localAddress;
            public static int dataPort;

            public PASVCommand() { }
            public PASVCommand(string commandName, NetworkStream netStream)
            {
                this.commandName = commandName;
                this.command_socketStream = netStream;

                byteWriter = new ByteWriter();

                //setting socket for data trasmission
                this.localAddress = "localhost";
            }

            public async Task ExecutingCommand()
            {
                dataPort = new Random().Next(1024, 65535 + 1);
                try
                {
                    await byteWriter.convertAndWriteBytes($"227 Entering Passive Mode (127,0,0,1,{dataPort / 256},{dataPort % 256})\r\n");
                    
                    await ByteSender.SendResponse(command_socketStream, byteWriter);
                    
                    CommandController.CommandController.isPassiveMode = true;

                    await LogicController.LogicController.openPassivePort();
            }
                catch (Exception ex)
                {
                    Console.WriteLine("Error converting in bytes the following command PASV: " + ex.Message);
                }
            }
    }

    public class PORTCommand : FtpCommand
    {
            public ByteWriter byteWriter { get; set; }
            public NetworkStream command_socketStream { get; set; }
            public string commandName { get; set; }

            public static int dataPortFromClient { get; set; }

            public PORTCommand() { }
            public PORTCommand(string commandName, NetworkStream netStream)
            {
                this.commandName = commandName;
                this.command_socketStream = netStream;

                byteWriter = new ByteWriter();
            }

            public async Task ExecutingCommand()
            {
                try
                {
                    //getting the ports from the string
                    string[] stringReceived = commandName.Split(',');
                    string value = stringReceived[stringReceived.Length - 2];

                    //get int dataPort calculated with x1*256+x2 of the sequence (127,0,0,1,x1,x2)
                    int dataPort = Convert.ToInt32(value) * 256 + Convert.ToInt16(stringReceived[stringReceived.Length - 1]);
                    dataPortFromClient = dataPort;

                    //converting in byte the response
                    string response = "200 Command okay \r\n";
                    await byteWriter.convertAndWriteBytes(response);

                    //sending response
                    await ByteSender.SendResponse(command_socketStream, byteWriter);
                }
                catch (Exception ex)
                {
                    Console.WriteLine("Error converting bytes the following command PORT: " + ex.Message);
                }
            }
    }

    public class PWDCommand : FtpCommand
    {
            public ByteWriter byteWriter { get; set; }
            public string commandName { get; set; }
            public NetworkStream command_socketStream { get; set; }

            public PWDCommand() { }
            public PWDCommand(string commandName, NetworkStream netStream)
            {
                this.commandName = commandName;
                this.command_socketStream = netStream;


                byteWriter = new ByteWriter();
            }
            public async Task ExecutingCommand()
            {
                try
                {
                    string currentPath = Directory.GetCurrentDirectory();
                    await byteWriter.convertAndWriteBytes($"257 {currentPath} is the current directory \r\n");

                    await ByteSender.SendResponse(command_socketStream, byteWriter);
                }
                catch (Exception ex)
                {
                    Console.WriteLine("Error converting bytes in the following command PWD :" + ex.Message);
                }
            }
    }

    public class RMDCommand : FtpCommand
    {
            public ByteWriter byteWriter { get; set; }
            public NetworkStream command_socketStream { get; set; }
            public string commandName { get; set; }
            public string directoryName { get; set; }

            public RMDCommand() { }
            public RMDCommand(string commandName, string directoryName, NetworkStream netStream)
            {
                this.commandName = commandName;
                this.directoryName = directoryName;
                this.command_socketStream = netStream;

                byteWriter = new ByteWriter();
            }
            public async Task ExecutingCommand()
            {
                try
                {
                    if (Directory.Exists(directoryName))
                    {
                        if (Directory.GetDirectories(Path.GetFullPath(directoryName)).Length == 0 && Directory.GetFiles(Path.GetFullPath(directoryName)).Length == 0)
                        {
                            Directory.Delete(directoryName);
                            await byteWriter.convertAndWriteBytes("250 Directory removed\r\n");
                        }
                        else
                        {
                            await byteWriter.convertAndWriteBytes("550 Directory not empty\r\n");
                        }
                    }
                    else
                    {
                        await byteWriter.convertAndWriteBytes("550 Directory does not exists\r\n");
                    }

                    await ByteSender.SendResponse(command_socketStream, byteWriter);

                }
                catch (Exception ex)
                {
                    Console.WriteLine("Error during the execution of the following command RMD: " + ex.Message);
                }
            }
    }

    public class RNFRCommand : FtpCommand
    {
            public ByteWriter byteWriter { get; set; }
            public NetworkStream command_socketStream { get; set; }
            public string commandName { get; set; }
            public static string fileName { get; set; }

            public RNFRCommand() { }
            public RNFRCommand(string commandName, string fileToDelete, NetworkStream netStream)
            {
                this.commandName = commandName;
                this.command_socketStream = netStream;

                fileName = fileToDelete;

                byteWriter = new ByteWriter();
            }

            public async Task ExecutingCommand()
            {
                try
                {
                    if (Directory.Exists(Path.GetFullPath(fileName)) || File.Exists(Path.GetFullPath(fileName))) await byteWriter.convertAndWriteBytes("350 Direcotry exists\r\n");
                    else await byteWriter.convertAndWriteBytes("550 Direcotry not exists\r\n");

                    //sending response
                    await ByteSender.SendResponse(command_socketStream, byteWriter);

                }
                catch (Exception ex)
                {
                    Console.WriteLine("Error during the execution of the following command RNFR:" + ex.Message);
                }
            }
    }

        public class RNTOCommand : FtpCommand
        {
                public ByteWriter byteWriter { get; set; }
                public NetworkStream command_socketStream { get; set; }
                public string commandName { get; set; }
                public string newFileName { get; set; }

                public RNTOCommand() { }
                public RNTOCommand(string commandName, string fileToRename, NetworkStream netStream)
                {
                    this.commandName = commandName;
                    this.newFileName = fileToRename;
                    this.command_socketStream = netStream;

                    byteWriter = new ByteWriter();
                }
                public async Task ExecutingCommand()
                {
                    try
                    {
                        if (!Directory.Exists(Path.GetFullPath(newFileName)) && !File.Exists(Path.GetFullPath(newFileName)))
                        {
                            Directory.Move(RNFRCommand.fileName, newFileName);
                            await byteWriter.convertAndWriteBytes("250 Rename successfull\r\n");
                        }
                        else
                        {
                            await byteWriter.convertAndWriteBytes("350 File/dir already exists \r\n");
                        }

                        //Sending response
                       await  ByteSender.SendResponse(command_socketStream, byteWriter);

                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine("Error during the execution of the following command RNTO: " + ex.Message);
                    }
                }
        }

    public class SYSTCommand : FtpCommand
    {
            public ByteWriter byteWriter { get; set; }
            public NetworkStream command_socketStream { get; set; }
            public string commandName { get; set; }

            public SYSTCommand() { }
            public SYSTCommand(string commandName, NetworkStream netStream)
            {
                this.commandName = commandName;
                this.command_socketStream = netStream;

                byteWriter = new ByteWriter();
            }

            public async Task ExecutingCommand()
            {
                try
                {
                    await byteWriter.convertAndWriteBytes("215 Windows_NT \r\n");
                    await ByteSender.SendResponse(command_socketStream, byteWriter);
                }
                catch (Exception ex)
                {
                    Console.WriteLine("Error converting into bytes the followind command SYSTE: " + ex.Message);
                }
            }
    }

    public class TYPEACommand : FtpCommand
    {
            public ByteWriter byteWriter { get; set; }
            public NetworkStream command_socketStream { get; set; }
            public string commandName { get; set; }

            public TYPEACommand() { }
            public TYPEACommand(string commandName, NetworkStream netStream)
            {
                this.commandName = commandName;
                this.command_socketStream = netStream;

                byteWriter = new ByteWriter();
            }
            public async Task ExecutingCommand()
            {
                try
                {
                    await byteWriter.convertAndWriteBytes("200 Type set to A\r\n");

                    await ByteSender.SendResponse(command_socketStream, byteWriter);
                }
                catch (Exception ex)
                {
                    Console.WriteLine("Error converting bytes for the following command TYPEA: " + ex.Message);
                }
            }
    }

    public class TYPEICommand : FtpCommand
    {
            public ByteWriter byteWriter { get; set; }
            public NetworkStream command_socketStream { get; set; }
            public string commandName { get; set; }

            public TYPEICommand() { }
            public TYPEICommand(string commandName, NetworkStream netStream)
            {
                this.commandName = commandName;
                this.command_socketStream = netStream;

                byteWriter = new ByteWriter();
            }
            public async Task ExecutingCommand()
            {
                try
                {
                    await byteWriter.convertAndWriteBytes("200 Command okay\r\n");
                    await ByteSender.SendResponse(command_socketStream, byteWriter);
                }
                catch (Exception e)
                {
                    Console.WriteLine("Error converting bytes of the following command TYPE: " + e.Message);
                }
            }
    }

    public class USERCommand : FtpCommand
    {
            public ByteWriter byteWriter { get; set; }
            public NetworkStream command_socketStream { get; set; }
            public string commandName { get; set; }

            public USERCommand() { }
            public USERCommand(string commandName, NetworkStream clientStream)
            {
                this.commandName = commandName;
                this.command_socketStream = clientStream;

                byteWriter = new ByteWriter();
            }

            public async Task ExecutingCommand()
            {
                try
                {
                    string response = "331 Password require for username \r\n";
                    await byteWriter.convertAndWriteBytes(response);

                    //Send response
                    await ByteSender.SendResponse(command_socketStream, byteWriter);
                }
                catch (Exception ex)
                {
                    Console.WriteLine("Error managing the USER command: " + ex.Message);
                }
            }
    }

    public class STORCommand : FtpCommand
    {
        public ByteWriter byteWriter { get; set; }
        public NetworkStream command_socketStream { get; set; }
        public string commandName { get; set; }
        public static string fileName { get; set; }

        public STORCommand() { }
        public STORCommand(string commandName, string file, NetworkStream stream)
        {
            this.commandName = commandName;
            this.command_socketStream = stream;

            fileName = file;

            byteWriter = new ByteWriter();
        }
        public async Task ExecutingCommand()
        {
            try
            {
                await ByteSender.retrieveDataFromDataPortOfClient(command_socketStream, byteWriter);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error executing the command STOR: " + ex.Message);
            }
        }

        public static async Task receiveDataFromClientSocket(TcpClient tcpClient)
        {
            //initialize a buffer where to keep data from the client
            byte[] bytesToReceive = new byte[1024];
            int numberOfBytes;

            //get the client stream from the tcp client socket
            NetworkStream clientStream = new NetworkStream(tcpClient.Client, false);

            try
            {
                using (FileStream fStream = new FileStream((string)Directory.GetCurrentDirectory() + "\\" + STORCommand.fileName, FileMode.Create, FileAccess.Write))
                {
                    while ((numberOfBytes = await clientStream.ReadAsync(bytesToReceive, 0, bytesToReceive.Length)) > 0)
                    {
                        await fStream.WriteAsync(bytesToReceive, 0, numberOfBytes);
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error receiving data from the client socket for the following command STOR: " + ex.Message);
            }
            finally { if (tcpClient != null) tcpClient.Close(); }
        }
    }

    public class RETRCommand : FtpCommand
    {
        public ByteWriter byteWriter { get; set; }
        public NetworkStream command_socketStream { get; set; }
        public string commandName { get; set; }
        public string fileToDownload { get; set; }

        public RETRCommand() { }
        public RETRCommand(string commandName, string fileToDownload, NetworkStream netStream)
        {
            this.commandName = commandName;
            this.fileToDownload = fileToDownload;
            this.command_socketStream = netStream;

            byteWriter = new ByteWriter();
        }
        public async Task ExecutingCommand()
        {
            byte[] buffer = new byte[2048];
            int bytesToRead;
            try
            {
                string[] files = Directory.GetFiles((string)Directory.GetCurrentDirectory());
                foreach (string file in files)
                {
                    if (Path.GetFileName(file).Equals(fileToDownload))
                    {
                        using (FileStream filestream = new FileStream(file, FileMode.Open, FileAccess.Read))
                        {
                            while ((bytesToRead = await filestream.ReadAsync(buffer, 0, buffer.Length)) > 0)
                            {
                                await byteWriter.mem_stream.WriteAsync(buffer, 0, bytesToRead);
                            }
                        }
                    }
                }

                //sending message
                await ByteSender.SendResponseToTheDataPortOfClient(command_socketStream, byteWriter);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error convertin bytes for the following command RETR: " + ex.Message);
            }
        }
    }

    public class LISTCommand : FtpCommand
    {
        public ByteWriter byteWriter { get; set; }
        public NetworkStream command_socketStream { get; set; }
        public string commandName { get; set; }

        public LISTCommand() { }
        public LISTCommand(string commandName, NetworkStream socketStream)
        {
            this.commandName = commandName;
            this.command_socketStream = socketStream;

            byteWriter = new ByteWriter();
        }


        public async Task ExecutingCommand()
        {
            try
            {
                //get the list of the directories in the current working path
                string[] directories = Directory.GetDirectories((string)Directory.GetCurrentDirectory());

                //get the list of files in the current working directory
                string[] files = Directory.GetFiles((string)Directory.GetCurrentDirectory());

                //building new string builder
                var stringBuild = new StringBuilder();

                foreach (var dir in directories)
                {
                    stringBuild.Append($"drwxr-xr-x 1 user group 4096 {Directory.GetCreationTime(dir):MMM dd HH:mm} {Path.GetFileName(dir)}\n");
                }

                foreach (var file in files)
                {
                    var fileInfo = new FileInfo(file);
                    stringBuild.AppendLine($"-rw-r--r-- 1 user group {fileInfo.Length} {fileInfo.LastWriteTime:MMM dd HH:mm} {Path.GetFileName(file)}\n");
                }

                //write bytes into the socket
                await byteWriter.convertAndWriteBytes(stringBuild.ToString());

                //sending response to the client socket into the data port
                await ByteSender.SendResponseToTheDataPortOfClient(command_socketStream, byteWriter);

            }
            catch (Exception ex)
            {
                Console.WriteLine("Error converting in bytes the reply to LIST command: " + ex.Message);
            }
        }
    }
}