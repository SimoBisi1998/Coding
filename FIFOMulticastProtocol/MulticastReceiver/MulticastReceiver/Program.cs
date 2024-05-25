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
        public static List<Message> elementsToRemove = new List<Message>();
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

            Console.WriteLine("Waiting for messages...");

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

                for (int i = 0; i < arraySeq.Length; i++)
                {
                    //if the received seq is less than the respective seq in the array
                    if (((string)obj["nodeId"]).Equals(arraySeq[i].nodeId))
                    {
                        //if the value is less and also i didnt send this message before
                        if ((int)obj["actualSeq"] <= arraySeq[i].actualSeq && !duplicatedMessages.Contains(messageReceived))
                        {
                            //if its not present in the "queue"
                            if (!messageList.Contains(messageReceived))
                            {
                                //print message
                                receivedMessage(messageReceived, i, "");
                            }

                            //foreach message inside the list of message inqueued
                            foreach (Message message in messageList)
                            {
                                if (message.nodeId.Equals(arraySeq[i].nodeId) && message.actualSeq <= arraySeq[i].actualSeq)
                                {
                                    elementsToRemove.Add(message);
                                    find = true;
                                }
                            }

                            if(find)
                            {
                                foreach(Message m in elementsToRemove)
                                {
                                    //print message
                                    receivedMessage(m, i,"Message remove from queue");

                                    if (!duplicatedMessages.Contains(m)) duplicatedMessages.Add(m);

                                    //remove the element from the list
                                    messageList.Remove(m);
                                }

                                //free the list of elements to remove
                                elementsToRemove.Clear();

                                find = false;
                            }

                            if (!duplicatedMessages.Contains(messageReceived))
                            {
                                //add the message received to keept track of the duplicated messages
                                duplicatedMessages.Add(messageReceived);
                            }
                            
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

                                    Console.WriteLine("Message: " + messageReceived.nodeId + "," + messageReceived.actualSeq + " enqueued..");
                                }
                            }
                        }
                    }
                }
            }
        }

        public static void receivedMessage(Message messageReceived,int i,string message)
        {
            //increase the respective value
            arraySeq[i].actualSeq++;

            //print the message
            messageReceived.printMessage(message);
        }
    }
}
