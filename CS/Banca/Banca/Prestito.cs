using System;
namespace Banca
{
	public class Prestito
	{
		public int ammontare;
		public int rata;
		public DateTime dataInizio;
        public DateTime dataFine;

        public Prestito(int id,int ammontare, int rata, DateTime dataInizio, DateTime dataFine)
        {
            
            this.ammontare = ammontare;
            this.rata = rata;
            this.dataInizio = dataInizio;
            this.dataFine = dataFine;
        }



    }
}

