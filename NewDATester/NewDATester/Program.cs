using DATester;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace TesterDA
{
    static class Program
    {
        public static string errorPath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "DATesterERROR.log");
        public static string logPath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "DATesterINFO.log");
        /// <summary>
        /// The main entry point for the application.
        /// </summary>
        [STAThread]
        static void Main()
        {
            Application.EnableVisualStyles();
            Application.SetCompatibleTextRenderingDefault(false);
            Application.Run(new ConfigurationServerForm());

            if (ServerConnection.mainEventClosed)
            {
                Environment.Exit(0);
            }
        }
    }
}
