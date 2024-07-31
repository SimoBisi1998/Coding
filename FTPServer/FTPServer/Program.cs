using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BUI_XML;
using System.IO;

namespace FTPServer
{
    public class Program
    {
        public static void Main(string[] args)
        {
            int commandPort = 9090;
            
            //Create new instance of tcp server
            FTPServer ftpServer = new FTPServer(commandPort);
            ftpServer.multipleTcpListenerAsync().GetAwaiter().GetResult();
        }
    }
}
