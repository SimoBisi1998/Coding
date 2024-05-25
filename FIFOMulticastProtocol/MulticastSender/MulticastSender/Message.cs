using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MulticastSender
{
    [Serializable]
    class Message
    {
        public string nodeId;
        public int actualSeq;

        public Message(string id, int sendSeq)
        {
            this.nodeId = id;
            this.actualSeq = sendSeq;
        }

        public void toString()
        {
            Console.WriteLine(nodeId + ", " + actualSeq);
        }
    }
}
