using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Sockets;
using System.Runtime.Serialization;
using System.Runtime.Serialization.Formatters.Binary;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace MulticastSender
{
    class Program
    {
        private static readonly string multicastAddress = "224.0.0.1";

        static void Main(string[] args)
        {
            //converting string to ipAddress
            IPAddress multicastIpAddress = IPAddress.Parse(multicastAddress);

            //new istance of a udp client
            UdpClient sender = new UdpClient();

            //the client is joining to the multicast group
            sender.JoinMulticastGroup(multicastIpAddress);

            //set socket
            IPEndPoint endPoint = new IPEndPoint(multicastIpAddress, 3000);

            //create new instance of message
            Message msg = null;

            //create new nodes to add 
            Node nodeA = new Node("A",0);
            Node nodeB = new Node("B",0);
            Node nodeC = new Node("C",0);
            Node nodeD = new Node("D",0);


            while (true)
            {
                //simulate random sender between the nodes
                Random rd = new Random();
                int generatedNumber = rd.Next(0, 5);

                //generated casual sequence
                int seqGenerated = rd.Next(0, 15);

                string nodeId = "";

                switch (generatedNumber)
                {
                    case 0:
                        {
                            //assign the id of the node to the current generated node
                            nodeId = nodeA.nodeId;

                            //increase the rispective position in the array
                            nodeA.arraySeq[0] += 1;

                            //set the actual sequence of the current node to the number generated before
                            nodeA.actualSeq = seqGenerated;

                            //istance of message
                            msg = new Message(nodeId, nodeA.actualSeq);
                            
                            break;
                        }
                    case 1:
                        {
                            //assign the id of the node to the current generated node
                            nodeId = nodeB.nodeId;

                            //increase the rispective position in the array
                            nodeB.arraySeq[1] += 1;

                            //set the actual sequence of the current node to the number generated before
                            nodeB.actualSeq = seqGenerated;

                            //istance of message
                            msg = new Message(nodeId, nodeB.actualSeq);
                            
                            break;
                        }
                    case 2:
                        {
                            //assign the id of the node to the current generated node
                            nodeId = nodeC.nodeId;

                            //increase the rispective position in the array
                            nodeC.arraySeq[2] += 1;

                            //set the actual sequence of the current node to the number generated before
                            nodeC.actualSeq = seqGenerated;

                            //istance of message
                            msg = new Message(nodeId, nodeC.actualSeq);
                            break;
                        }
                    case 3:
                        {
                            //assign the id of the node to the current generated node
                            nodeId = nodeD.nodeId;

                            //increase the rispective position in the array
                            nodeD.arraySeq[3] += 1;

                            //set the actual sequence of the current node to the number generated before
                            nodeD.actualSeq = seqGenerated;

                            //istance of message
                            msg = new Message(nodeId, nodeD.actualSeq);
                            break;
                        }
                }

                if (nodeId != "")
                {
                    try
                    {
                        //convert the msg into a json message
                        string jsonMessage = JsonConvert.SerializeObject(msg);

                        // convert json string into bytes using UTF-8
                        byte[] bytesToSend = Encoding.UTF8.GetBytes(jsonMessage);

                        // send serialized data using udp channel
                        sender.Send(bytesToSend, bytesToSend.Length, endPoint);


                        msg.printMessage();
                    }
                    catch (Exception e)
                    {
                        Console.WriteLine("Exception: " + e.Message);
                    }

                    //wait 1 seconds
                    Thread.Sleep(10);
                }
                
            }


        }
    }
}
