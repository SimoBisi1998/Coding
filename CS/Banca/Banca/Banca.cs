using System;
using System.Data;
using System.Text;

namespace Banca
{
	public class Banca
	{
		public string nome;
		public List<Cliente> list;

        public Banca(string nome, List<Cliente> list)
        {
            this.nome = nome;
            this.list = new List<Cliente>();
        }

        List<Cliente> addClient()
		{
			Console.WriteLine("Inserisci nome:");
			string name = Console.ReadLine();
            Console.WriteLine("Inserisci cognome:");
            string surname = Console.ReadLine();
            Console.WriteLine("Inserisci cf:");
            string cf = Console.ReadLine();
            Console.WriteLine("Inserisci stipendio:");
            int salary = Convert.ToInt32(Console.ReadLine());

            Cliente c = new Cliente(name, surname, cf, salary);
            list.Add(c);

            list.Add(new Cliente("ciao", "come", "stai", 123));

            Console.WriteLine("");
            printAllClient(list);
            return list;
        }

        string getBankName(Banca b)
        {
            return b.nome;
        }

        void getClient(List<Cliente> list,string cf) {
            foreach(Cliente x in list)
            {
                if(x.cf.Equals(cf))
                {
                    Console.WriteLine("Information's of client are: " + x.cognome + " " + x.cf + " " + x.stipendio);
                }
            }
        }

        void printAllClient(List<Cliente> clients)
        {
            Console.WriteLine("List's of clients: ");
            foreach(Cliente c in clients)
            {
                Console.WriteLine(c.nome+ " " +c.cognome+" "+c.cf+" "+c.stipendio);
            }
        }

        List<Cliente> deleteClient(List<Cliente> list,string cf)
        {

            foreach(Cliente c in list)
            {
                if(c.cf.Equals(cf))
                {
                    list.Remove(c);
                    return list;
                }
            }
            return list;
        }


        public static void Main(string[] args)
		{
            List<Cliente> f = new List<Cliente>();
            Banca b = new Banca("Calippo's bank",f);
            f = b.addClient();

            //return name of bank
            Console.WriteLine("Bank's name: "+b.getBankName(b));

            //Search of client
            Console.WriteLine("Inserisci cf per la ricerca:");
            string cf = Console.ReadLine();
            b.getClient(f,cf);

            //Delete client
            f = b.deleteClient(f,cf);
            b.printAllClient(f);
		}
	}
}

