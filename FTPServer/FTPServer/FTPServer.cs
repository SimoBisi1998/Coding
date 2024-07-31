using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Sockets;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Serialization;
using BUI_XML;
using FTPServer.CommandController;

namespace FTPServer
{
    public class FTPServer
    {
        private readonly int[] _ports;
        public Config config = new Config();

        public FTPServer(params int[] ports)
        {
            _ports = ports;
        }

        public async Task multipleTcpListenerAsync()
        {
            //create two differents controllers to handle request and response
            CommandController.CommandController.commandPort = _ports[0];

            //start new task to listen the commands coming from the client
            await CommandController.CommandController.startListeningCommandFromClient();
        }
    }
}
