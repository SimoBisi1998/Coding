using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MulticastSender
{
    class Node
    {
        public int[] arraySeq = { 0,0,0,0};
        public int actualSeq;
        public string nodeId;
        public Node(string nodeId, int value)
        {
            this.nodeId = nodeId;
            this.actualSeq = value;
        }
    }
}
