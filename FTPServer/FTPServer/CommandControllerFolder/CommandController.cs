using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Net;
using System.Net.Sockets;
using System.IO;
using BUI_XML;
using System.Collections.Concurrent;

namespace FTPServer.CommandController
{
    public class CommandController
    {
        public static int commandPort = 9090;
        public static int dataPortConfig = 0;
        public static bool isPassiveMode = false;
        public static object obj = new object();
        private static Config config = new Config();
        private static bool _isProcessing = false;
        public static ConcurrentQueue<Func<Task>> concurrentQueue = new ConcurrentQueue<Func<Task>>();

        public static async Task startListeningCommandFromClient()
        {
            //deserialize config xml
            deserializeXml();

            try
            {
                //create a new instance of tcp server
                TcpListener commandSocket = new TcpListener(IPAddress.Loopback, commandPort);
                commandSocket.Start();

                //waiting for a connection
                Console.WriteLine("FTP Socket command port is listening data from the following socket: " + IPAddress.Loopback + ":" + commandPort);

                while (true)
                {
                    //accepting new connection
                    Socket tcpClient = await commandSocket.AcceptSocketAsync();

                    Console.WriteLine("New client is connected: " + tcpClient.RemoteEndPoint);

                    //handle the new request
                    Task.Run(() => HandleClientRequest(tcpClient));
                }
            }catch(Exception exception)
            {
                Console.WriteLine("Error: " + exception.Message);
            }
        }

        public static void deserializeXml()
        {
            StreamReader sr = null;
            XML_Processing xmlProc = new XML_Processing();

            try
            {
                if (File.Exists(Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "config.xml")))
                {
                    using (sr = new StreamReader(Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "config.xml")))
                    {
                        config = xmlProc.deserializeFromXML<Config>(sr.ReadToEnd());
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error deserializing from the xml file: " + ex.Message);
            }
        }

        private static async Task HandleClientRequest(Socket commandSocket)
        {
            List<byte> dataReceived = new List<byte>();
            ByteWriter byteWriter = new ByteWriter();

            try
            {
                using (NetworkStream socketStream = new NetworkStream(commandSocket, false))
                {
                    //Send welcome message
                    await byteWriter.convertAndWriteBytes("220 That's the Bisi's FTP server\r\n");
                    await socketStream.WriteAsync(byteWriter.mem_stream.ToArray(), 0, byteWriter.mem_stream.ToArray().Length);
                    await socketStream.FlushAsync();

                    // initialize buffer to store data coming from the client
                    byte[] buffer = new byte[1024];
                    int bytesRead;

                    while ((bytesRead = await socketStream.ReadAsync(buffer, 0, buffer.Length)) > 0)
                    {
                        for (int i = 0; i < bytesRead; i++)
                        {
                            byte value = buffer[i];

                            if (value == '\r')
                            {
                                string command = Encoding.ASCII.GetString(dataReceived.ToArray());
                                Console.WriteLine($"Received command: {command}");

                                tryHandleCommand(command, socketStream);

                                //clear data received
                                dataReceived.Clear();
                            }
                            else if (value == '\n') continue;
                            else dataReceived.Add(value);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error managing the request from client: " + ex.Message);
            }
        }

        public static void tryHandleCommand(string command,NetworkStream socketStream)
        {
            object[] parameters = new object[] { };
            try
            {
                if (command.Contains("TYPE"))
                {
                    string[] entireCommand = command.Split(' ');
                    command = "";
                    command += entireCommand[0] + entireCommand[1];
                }

                Type type = Type.GetType("FTPServer."+command.Split(' ')[0].TrimEnd()+"Command");
                if (type != null && typeof(FtpCommand).IsAssignableFrom(type))
                {
                    switch(type.Name) {

                        case "RMDCommand":
                        case "RNTOCommand":
                        case "RNFRCommand":
                        case "MKDCommand":
                        case "RETRCommand":
                        case "STORCommand":
                        case "DELECommand":
                        case "CWDCommand":
                            {
                                parameters = new object[] { command, command.Split(' ')[1], socketStream };            
                                break;
                            }
                        default:
                            {
                                parameters = new object[] { command, socketStream };
                                break;
                            }
                    }

                    //create new instance in base of the type got from the client during the runtime
                    var instance = Activator.CreateInstance(type, parameters);

                    //get the method to execute
                    var methodToExecute = type.GetMethod("ExecutingCommand");

                    //if its not null
                    if (methodToExecute != null)
                    {
                        //Create new delegate to encapsulate a function and execute it after the dequeing of it from a concurrent queue
                        Func<Task> com = async () =>
                        {
                            await (Task)methodToExecute.Invoke(instance, new object[] { });
                        };

                        //enqueue delegate
                        concurrentQueue.Enqueue(com);

                        //process the command in the queue
                        processQueue();
                    }
                }
            }
            catch(Exception ex)
            {
                Console.WriteLine("Error converting into a ftp command type the command received from the client: " + ex.Message);
            }
        }

        public static async void processQueue()
        {
            if (_isProcessing) return;

            //try to dequeue
            while(concurrentQueue.TryDequeue(out var command) && !_isProcessing)
            {
                _isProcessing = true;

                //queue is not empty
                try
                {
                    if (command != null)
                    {
                        _isProcessing = false;

                        //execute the command
                        await command();
                    }
                        
                }catch(Exception ex)
                {
                    Console.WriteLine("Error processing the concurrent queue: "+ex.Message);
                }
            }
        }
    }
}
