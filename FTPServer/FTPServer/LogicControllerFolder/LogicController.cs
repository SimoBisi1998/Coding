using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Net;
using System.Net.Sockets;
using System.IO;

namespace FTPServer.LogicController
{
    public class LogicController
    {
        public static TcpClient tcpClient;

        public static async Task<TcpClient> connectingToTheClientSocket(int dataPortFromClient)
        {
            try
            {
                //Create new instance of tcp client
                TcpClient tcpClient = new TcpClient();

                //try to connect to the client
                await tcpClient.ConnectAsync("127.0.0.1", dataPortFromClient);
                Console.WriteLine("FTP Server is connected to the socket data port of the client: " + "127.0.0.1:" + dataPortFromClient);

                //if it's connected
                if (tcpClient.Connected) return tcpClient;
            }
            catch(Exception ex)
            {
                Console.WriteLine("Error during the connection between data client socket and server: " + ex.Message);
            }

            return null;
        }

        public static async Task<TcpClient> openPassivePort()
        {
            TcpListener serverOnPassiveMode = null;
            try
            {
                serverOnPassiveMode = new TcpListener(IPAddress.Loopback, PASVCommand.dataPort);

                Console.WriteLine("FTP Server socket data port is listening on: " + IPAddress.Loopback + ":" + PASVCommand.dataPort);
                serverOnPassiveMode.Start();

                while (true)
                {
                    TcpClient clientSocket = await serverOnPassiveMode.AcceptTcpClientAsync();

                    //printing the new connection that is entering throw the tcp data socket established between client->server
                    Console.WriteLine("New data connection entering from: " + clientSocket.Client.RemoteEndPoint);

                    if (clientSocket != null) tcpClient = clientSocket;
                }
            }catch(Exception ex)
            {
                Console.WriteLine("Error listening in passive mode: "+ex.Message);
            }

            return null;
        }
    }
}
