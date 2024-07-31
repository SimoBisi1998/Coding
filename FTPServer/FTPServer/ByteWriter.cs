using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Net.Sockets;
using System.Threading.Tasks;

namespace FTPServer
{
    public class ByteWriter : IDisposable
    {
        public MemoryStream mem_stream = new MemoryStream();

        public async Task WriteBytes(byte[] bytes)
        {
            await mem_stream.WriteAsync(bytes, 0, bytes.Length);
        }

        public async Task convertAndWriteBytes(string command)
        {
            try
            {
                //converting response into ASCII code
                byte[] commandToSend = Encoding.ASCII.GetBytes(command);

                //write bytes to the memory stream
                await WriteBytes(commandToSend);
            }catch(Exception ex)
            {
                Console.WriteLine("Error getting bytes from ascii string: "+ex.Message);
            }
            
        }

        public void Dispose()
        {
            throw new NotImplementedException();
        }
    }
}
