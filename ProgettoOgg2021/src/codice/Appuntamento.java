package codice;

import java.util.regex.Pattern;

import codice.Data;
import codice.Orario;
import codice.DataException;
import codice.OraException;
import codice.Appuntamento;
/**
 * 
 * @author Bisignano,Pezzano
 *
 */
public class Appuntamento {
	private Data data;
	private Orario inizio;
	private int durata;
	private String nome;
	private String luogo;
	
	/**
	 * Costruttore della classe Appuntamento
	 * @param data - stringa che contiene la data dell'appuntamento
	 * @param inizio - stringa che determina l'orario di inizio dell'appuntamento
	 * @param durata - la durata espressa in intero 
	 * @param nome - stringa per il nome 
	 * @param luogo - stringa per il luogo
	 * @throws DataException Viene eseguita all'interno del metodo creaData solo se il formato non è corretto.
	 * @throws OraException Viene eseguita all'interno del metodo creaOrario solo se il formato non è corretto.
	 */
	public Appuntamento(String data, String inizio, int durata, String nome, String luogo) throws DataException, OraException{
		this.data = Data.creaData(data);
		this.inizio = Orario.creaOrario(inizio);
		this.durata = durata;
		this.nome = nome;
		this.luogo = luogo;
	}
	
	/**
	 * Metodo costruttore della classe Appuntamento.
	 * @param data - oggetto di tipo Data
	 * @param inizio - oggetto di tipo Orario
	 * @param durata - la durata espressa in intero
	 * @param nome - stringa per il nome
	 * @param luogo - stringa per il luogo
	 */
	public Appuntamento(Data data, Orario inizio, int durata, String nome, String luogo) {
		this.data = data;
		this.inizio = inizio;
		this.durata = durata;
		this.nome = nome;
		this.luogo = luogo;
	}
	
	/**
	 * Costruttore della classe Appuntamento,esso server per inizializzare le variabili private.
	 */
	public Appuntamento(){
		this.data = null;
		this.inizio = null;
		this.durata = 0;
		this.nome = null;
		this.luogo = null;
	}
	
	/**
	 * Metodo che viene utilizzato per modificare la variabile Data.
	 * @param data - oggetto Data
	 */
	public void setData(Data data){
		this.data = data;
	}
	
	/**
	 * Metodo che permette di modificare la variabile Data.
	 * @param s - stringa che rappresenta la data dell'appuntamento
	 * @throws viene lanciata la DataException nel caso in cui non è stato creato l'oggetto Data.
	 */
	public void setData(String s) throws DataException{
		Data d = Data.creaData(s);
		if(d!=null)
			data = d;
	}
	
	/**
	 * Metodo che modifica la variabile Orario.
	 * @param inizio - oggetto di tipo Orario
	 */
	public void setOrario(Orario inizio){
		this.inizio = inizio;
	}
	
	/**
	 * Metodo che permette di modificare la variabile Orario.
	 * @param s - stringa che identifica l'orario dell'appuntamento
	 * @throws OraException viene eseguita solo se non è stato possibile creare l'oggetto di tipo Orario.
	 */
	public void setOrario(String s)throws OraException{
		Orario o = Orario.creaOrario(s);
		if(o!=null)
			inizio = o;
	}
	
	/**
	 * Metodo statico che per controllare l'input utilizza le regex.
	 * @param app - oggetto di tipo Appuntamento
	 * @return	Ritorna true solo se il formato è valido, False altrimenti.
	 */
	public static boolean checkInputAppuntamento(Appuntamento app){
		if(!Data.checkData(app.getData().toString()))
			return false;
		if(!Orario.checkOrario(app.getOrario().toString()))
			return false;
		if(!(app.getDurata()<1439))
			return false;
		if(!Pattern.matches("(([A-Z][a-z]*)+\\s)*", app.getNome()))
			return false;
		if(!Pattern.matches("(([A-Z][a-z]*)+\\s)*", app.getLuogo()))
			return false;
		return true;
	}
	
	/**
	 * Metodo di tipo static che controlla quale appuntamento viene cronologicamente prima dell'altro.
	 * @param prev - oggetto di tipo Appuntamento
	 * @param next - oggetto di tipo Appuntamento
	 * @return Ritorna true se il primo Appuntamento(prev) viene cronologicamente prima del secondo(next);
	 * altrimenti ritorna false.
	 */
	public static boolean checkAppuntamento(Appuntamento prev, Appuntamento next){
		if(!Data.checkDataCron(prev.getData(), next.getData())){
			if(prev.getData().toString().equals(next.getData().toString())){
				if(Orario.checkOrarioCron(prev.getOrario(), next.getOrario()))
					return true;
				else
					return false;
			} else
				return false;
		}
		return true;
	}
	
	/**
	 * Metodo che permette di modificare la durata dell'appuntamento,poichè se sforasse le 24 ore
	 * viene arrotondata al massimo per le ore 23:59.
	 * @param durata - valore intero per la durata dellappuntamento
	 */
	public void setDurata(int durata){
		if(inizio.checkDurata(durata)){
			this.durata = durata;
		} else {
			this.durata = 59 - inizio.getMinuti();
			this.durata += (23 - inizio.getOre())*60;
		}
	}
	
	/**
	 * Metodo che serve per ottenere la data di un appuntamento,poichè è una variabile d'istanza privata
	 * @return Ritorna la data nel formato Data.
	 */
	public Data getData(){
		return data;
	}
	
	/**
	 * Metodo che serve per ottenere le ore, dato che è una variabile d'istanza privata,
	 * dell'oggetto sul quale è chiamato.
	 * @return Ritorna le ore dell'appuntamento in formato Orario.
	 */
	public Orario getOrario(){
		return inizio;
	}
	
	/**
	 * Metodo che permette di ottenere la durata,essendo una variabile d'istanza privata,
	 * dell'oggetto sul quale è stato chiamato.
	 * @return Ritorna la durata in intero.
	 */
	public int getDurata(){
		return durata;
	}
	
	/**
	 * Metodo che mi ritorna il nome dell'appuntamento, dato che anch'esso è una variabile d'istanza privata.
	 * @return Ritorna il nome in una stringa.
	 */
	public String getNome(){
		return nome;
	}
	
	/**
	 * Metodo che permette di ottenere il luogo di quel determinato appuntamento (variabile d'istanza privata)
	 * dell'oggetto sul quale è stato chiamato.
	 * @return Ritorna il luogo in una stringa.
	 */
	public String getLuogo(){
		return luogo;
	}
	
	/**
	 * Metodo che permette di ottenere l'orario di fine dell'appuntamento. 
	 * @return Ritorna le ore della fine dell'appuntamento nel formato Orario. 
	 */
	public Orario getOrarioFine(){
		return Orario.fineOrario(inizio, durata);
	}
	
	/**
	 * Metodo che crea una stringa in un formato predefinito che verrà usato per ogni appuntamento.
	 * @return Ritorna una stringa che conterrà l'appuntamento.
	 */
	public String toString(){
		String s = "";
		s += "Data: "+data.toString();
		s += "\nOrario inizio: "+inizio.toString();
		s += "\nOrario fine: "+Orario.fineOrario(inizio, durata).toString();
		s += "\nDurata: "+Integer.toString(durata);
		s += "\nNome: "+nome;
		s += "\nLuogo: "+luogo+"\n";
		return s;
	}

	public String setNome(String nome) {
		return nome;	
	}

	public String setLuogo(String substring) {
		return luogo;
	}
}
