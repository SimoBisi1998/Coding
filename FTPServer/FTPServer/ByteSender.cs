using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Sockets;
using System.Text;
using System.Threading.Tasks;

namespace FTPServer
{
    public class ByteSender
    {
        public static async Task SendResponse(NetworkStream command_socketStream,ByteWriter byteWriter)
        {
            try
            {
                //write the bytes into socket
                await command_socketStream.WriteAsync(byteWriter.mem_stream.ToArray(), 0, byteWriter.mem_stream.ToArray().Length);
                await command_socketStream.FlushAsync();
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error sending PORT response: " + ex.Message);
            }
        }

        public static async Task sendingTransferCompleted(NetworkStream command_socketStream)
        {
            ByteWriter bw = new ByteWriter();
            await bw.convertAndWriteBytes("226 Transfer completed\r\n");
            await command_socketStream.WriteAsync(bw.mem_stream.ToArray(), 0, bw.mem_stream.ToArray().Length);
            await command_socketStream.FlushAsync();
        }

        public static async Task sendingPrepareMessage(NetworkStream command_socketStream)
        {
            ByteWriter bw = new ByteWriter();
            await bw.convertAndWriteBytes("150 Opening data connection for directory list\r\n");
            await command_socketStream.WriteAsync(bw.mem_stream.ToArray(), 0, bw.mem_stream.ToArray().Length);
            await command_socketStream.FlushAsync();
        }

        public static async Task sendBytesToClientDataSocket(TcpClient tcpClient,ByteWriter byteWriter)
        {
            try
            {
                if (byteWriter.mem_stream.ToArray().Length > 0)
                {
                    //get the socket
                    Socket clientDataSocket = tcpClient.Client;

                    if (clientDataSocket != null)
                    {
                        //send via socket the result of the command
                        using (NetworkStream netStream = new NetworkStream(clientDataSocket, false))
                        {
                            await netStream.WriteAsync(byteWriter.mem_stream.ToArray(), 0, byteWriter.mem_stream.ToArray().Length);
                            await netStream.FlushAsync();
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error sending the data using the client socket for data trasmission: " + ex.Message);
            }finally { if (tcpClient != null) tcpClient.Close(); }

        }

        public static async Task SendResponseToTheDataPortOfClient(NetworkStream command_socketStream,ByteWriter byteWriter)
        {
            TcpClient tcpClient = null;
            try
            {
                //sending preparing message
                await ByteSender.sendingPrepareMessage(command_socketStream);

                if (CommandController.CommandController.isPassiveMode && LogicController.LogicController.tcpClient!=null)
                {
                    tcpClient = LogicController.LogicController.tcpClient;
                }
                else
                {
                    //getting the instance of tcp client after a connection from the server to the client's data port
                    tcpClient = await LogicController.LogicController.connectingToTheClientSocket(PORTCommand.dataPortFromClient);
                }
                
                if (tcpClient != null)
                {
                    await ByteSender.sendBytesToClientDataSocket(tcpClient, byteWriter);
                }

                await ByteSender.sendingTransferCompleted(command_socketStream);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error sending response to the LIST Command: " + ex.Message);
            }
            
        }

        public static async Task retrieveDataFromDataPortOfClient(NetworkStream command_socketStream, ByteWriter byteWriter)
        {
            TcpClient tcpClient = null;

            try
            {
                //sending preparing message
                await ByteSender.sendingPrepareMessage(command_socketStream);

                if (CommandController.CommandController.isPassiveMode && LogicController.LogicController.tcpClient!=null)
                {
                    tcpClient = LogicController.LogicController.tcpClient;
                }
                else
                {
                    //getting the instance of tcp client after a connection from the server to the client's data port
                    tcpClient = await LogicController.LogicController.connectingToTheClientSocket(PORTCommand.dataPortFromClient);
                }
                
                if (tcpClient != null)
                {
                    await STORCommand.receiveDataFromClientSocket(tcpClient);
                }

                await ByteSender.sendingTransferCompleted(command_socketStream);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error sending response to the LIST Command: " + ex.Message);
            }
        }

        
    }
}
