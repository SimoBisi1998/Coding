package codice;

import codice.OraException;

public class Orario {
	private int ore;
	private int minuti;
	
	private Orario(int h,int min) {
		ore = h;
		minuti = min;
	}
	
	private Orario(String h)
	{
		String[] t = h.split(":");
		ore = Integer.parseInt(t[0]);
		minuti = Integer.parseInt(t[1]);
	}
	
	/* Metodo che controlla se l'input dell'orario è corretto e nel caso lo fosse,effettua una chiamata al costruttore
	 * allocando creando l'oggetto di tipo Orario.
	 */
	public static Orario creaOrario(String s)throws OraException{
		if(Orario.checkOrario(s)){
			return new Orario(s);
		}else
			return null;
	}
	
	/*Controlla se l'orario inserito è nel formato corretto,utilizzando la regex.*/
	
	public static boolean checkOrario(String s) {
		if(s.matches("(0+[0-9]|1+[0-9]|2+[0-3]):([0-5][0-9])")) {
			return true;
		}else
			return false;
	}
	
	/*Metodo statico che controlla quale dei due orari è precedente all'altro.*/
	
	public static boolean checkOrarioCron(Orario prec,Orario next) {
		if(prec.getOre()<next.getOre()) {
			return true;
		}else if(prec.getOre()==next.getOre()) {
			if(prec.getMinuti()<next.getMinuti()) {
				return true;
			}
		}
		return false;
	}

	/*Metodo che mi calcola l'orario di fine dell'appuntamento.
	 */
	public static Orario fineOrario(Orario in, int durata){
		Orario fine = null;
		int minuti = in.getMinuti()+durata;
		int ore;
		if(minuti>59){
			ore = in.getOre() + minuti / 60;
			minuti = minuti % 60;
		} else
			ore = in.getOre();
		fine = new Orario(ore, minuti);
		return fine;
	}
	
	/*Metodo che mi controlla la durata dell'appuntamento,ritornando true nel caso non superasse
	 * le 24 ore,false altrimenti*/
	
	public boolean checkDurata(int durata){ //non deve sforare le 24 ore giornaliere,se sfora ritorno false
		int nuoviMinuti = minuti + durata; 
		if(nuoviMinuti>59){
			nuoviMinuti = ( minuti + durata ) % 60;
			int nuoveOre = ((minuti+durata)/60)+ore;
			if(nuoveOre>23)
				return false;
		}
		return true;
	}
	
	public String toString(){
		String s = "";
		if(ore<10)
			s += "0";
		s += ore+":";
		if(minuti<10)
			s += "0";
		s += minuti;
		return s;
	}
	
	public int getOre() {
		return ore;
	}
	
	public int getMinuti() {
		return minuti;
	}
	
	public void setOre(int h) {
		ore = h;
	}
	
	public void setMinuti(int min) {
		minuti = min;
	}
	
}
