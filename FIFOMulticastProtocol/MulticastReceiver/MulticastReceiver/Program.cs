using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Sockets;
using System.Net;
using System.Text;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Threading;
using System.Runtime.Remoting.Messaging;

namespace MulticastReceiver
{
    class Program
    {
        public static string multicastStringAddress = "224.0.0.1";
        public static Message[] arraySeq = new Message[4];
        public static List<Message> messageList = new List<Message>();
        public static List<Message> duplicatedMessages = new List<Message>();
        public static bool find = false;


        public static void Main(string[] args)
        {
            //
            IPAddress multicastAddress = IPAddress.Parse(multicastStringAddress);

            //adding the nodes to the arrayseq
            arraySeq[0] = new Message("A", 0);
            arraySeq[1] = new Message("B", 0);
            arraySeq[2] = new Message("C", 0);
            arraySeq[3] = new Message("D", 0);

            //Create new instance of a receiver
            UdpClient receiver = new UdpClient(3000);

            //join multicast group
            receiver.JoinMulticastGroup(multicastAddress);

            //set socket to receive data
            IPEndPoint endPoint = new IPEndPoint(multicastAddress, 3000);

            while (true)
            {
                //bytes received
                byte[] bytesReceived = receiver.Receive(ref endPoint);

                //converting bytes to a json String
                string jsonMessage = Encoding.UTF8.GetString(bytesReceived);

                //convert the jsonstring to a jobject to get the value of each attribute
                JObject obj = JObject.Parse(jsonMessage);

                //serialize json into a Message
                Message messageReceived = JsonConvert.DeserializeObject<Message>(jsonMessage);

                //message to remove from list
                Message messageToRemove = null;

                for (int i = 0; i < arraySeq.Length; i++)
                {
                    //if the received seq is less than the respective seq in the array
                    if (((string)obj["nodeId"]).Equals(arraySeq[i].nodeId))
                    {
                        if ((int)obj["actualSeq"] <= arraySeq[i].actualSeq && !duplicatedMessages.Contains(messageReceived))
                        {
                            //print message
                            receivedMessage(messageReceived, i);

                            foreach (Message message in messageList)
                            {
                                if (message.nodeId.Equals(arraySeq[i].nodeId) && message.actualSeq <= arraySeq[i].actualSeq)
                                {
                                    //assign the message to remove in the variable
                                    messageToRemove = message;
                                    find = true;
                                }
                            }

                            if(find)
                            {
                                //print message
                                receivedMessage(messageToRemove, i);

                                //remove the element from the list
                                messageList.Remove(messageToRemove);

                                find = false;
                            }

                            //add the message received to keept track of the duplicated messages
                            duplicatedMessages.Add(messageReceived);
                        }
                        else
                        {
                            if(!duplicatedMessages.Contains(messageReceived))
                            {
                                //if the messagequeu does not contains the received message
                                if (!messageList.Contains(messageReceived))
                                {
                                    //otherwise put in a queue
                                    messageList.Add(messageReceived);

                                    Console.WriteLine("Message :" + messageReceived.nodeId + "," + messageReceived.actualSeq + " enqueued..");
                                }
                                else
                                {
                                    //otherwise print the advise
                                    Console.WriteLine("Message duplicated and ignored.");
                                }
                            }

                            //add the message received to keept track of the duplicated messages
                            duplicatedMessages.Add(messageReceived);
                        }
                    }
                }


                //wait one second
                Thread.Sleep(1000);
            }
        }

        public static void receivedMessage(Message messageReceived,int i)
        {
            //increase the respective value
            arraySeq[i].actualSeq++;

            //print the message
            messageReceived.printMessage();
        }
    }
}
