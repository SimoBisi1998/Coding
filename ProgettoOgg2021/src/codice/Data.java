package codice;

import java.util.regex.Pattern;

import codice.Data;
import codice.DataException;

public class Data {
	
	private int anno;
	private int giorno;
	private int mese;
	
	/**
	 * COSTRUTTORE PRIVATO della classe Data,il quale prende in input una stringa e crea l'oggetto di tipo Data -
	 * @param data - Stringa che identifica la data
	 */
	private Data(String data) {
		String[] vet = data.split("-");
		giorno = Integer.parseInt(vet[0]);
		mese = Integer.parseInt(vet[1]);
		anno = Integer.parseInt(vet[2]);
	}
	
	/*Metodo statico che verifica l'input della data, se effetivamente è scritta nel formato corretto.*/
	public static boolean checkData(String data) {
		if(data.matches("(((0+[1-9]|[12][0-9]|30)-(0+[469]|11))|((0+[1-9]|[12][0-9]|3[01])-(0+[13578]|1[02]))|((0+[1-9]|[12][0-9])-(0?2)))-(20)\\d\\d"))
			return true;
		else
			return false;
	}
	
	/**
	 * Metodo di tipo static che crea un oggetto di tipo Data,passandogli come parametro una Stringa.
	 * @param s - stringa che identifica la data
	 * @return Se venisse correttamente eseguito, viene creato l'oggetto di tipo Data,altrimenti viene eseguita l'eccezione
	 * @throws DataException Viene lanciata solo se il formato della data inserita non è valido.
	 */
	public static Data creaData(String s) throws DataException{
		if(Data.checkData(s))
			return new Data(s);
		else 
			throw new DataException();
	}

	/**
	 * Metodo di tipo static che controlla se l'oggetto di tipo Data prev,viene cronologicamente prima dell'oggetto
	 * di tipo Data next.
	 * @param oggetto Data prev 
	 * @param oggetto Data next
	 * @return Ritorna true solo se il primo parametro è cronolocagicamente precedente al secondo parametro;
	 * altrimenti ritorna false.
	 */
	public static boolean checkDataCron(Data prev, Data next){
		if(prev.getAnno()<next.getAnno())
			return true;
		else if(prev.getAnno()==next.getAnno()){
			if(prev.getMese()<next.getMese())
				return true;
			else if(prev.getMese()==next.getMese()){
				if(prev.getGiorno()<next.getGiorno())
					return true;
				else
					return false;
			}else
				return false;
		}else
			return false;
	}

	private int getAnno() {
		return anno;
	}
	
	/**
	 * Metodo che permette di estrarre il mese,poichè è una variabile d'istanza privata.
	 * @return Ritorna il mese in intero.
	 */
	private int getMese() {
		return mese;
	}
	
	/**
	 * Metodo che permette di ottenere il giorno,poichè è una variabile d'istanza privata.
	 * @return Ritorna il giorno in un valore intero.
	 */
	private int getGiorno() {
		return giorno;
	}
	
	/**
	 * Metodo che crea una stringa partendo dall'oggetto di tipo Data
	 * @return Ritorna una stringa nel formato predefinito gg-mm-aaaa.
	 */
	public String toString(){
		String s = "";
		if(giorno<10)
			s += "0";
		s += giorno+"-";
		if(mese<10)
			s += "0";
		s += mese+"-"+anno;
		return s;
	}
	}

