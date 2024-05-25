using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MulticastReceiver
{
    [Serializable]
    public class Message
    {
        public string nodeId;
        public int actualSeq;

        public Message(string id, int sendSeq)
        {
            this.nodeId = id;
            this.actualSeq = sendSeq;
        }

        public void printMessage()
        {
            Console.WriteLine("Message received: "+ this.nodeId + ", " + this.actualSeq);
        }

        public override bool Equals(Object obj)
        {
            if(obj == null || GetType()!=obj.GetType())
            {
                return false;
            }

            Message other = (Message)obj;

            return nodeId == other.nodeId && actualSeq == other.actualSeq;
        }
    }
}
