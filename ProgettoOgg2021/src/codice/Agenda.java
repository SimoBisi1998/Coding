package codice;

import java.io.*;
import java.util.Vector;

import codice.Appuntamento;
import codice.Orario;
import codice.DataException;
import codice.OraException;
import codice.AgendaVuotaException;
import codice.Data;

public class Agenda {
	
	protected Vector<Appuntamento> agenda = null;
	private final String percorso = "agenda.txt";
	
	public Agenda() {
		agenda = new Vector<Appuntamento>();
	}	
	
	/**
	 * Metodo che inserisce l'appuntamento in base all'ordine cronologico di essi 
	 * @param input oggetto Appuntamento da inserire
	 * @return True se viene inserito, False se input null o crea collisioni
	 */
	
	public boolean inserisciAppuntamento(Appuntamento app){
		if(controlloApp(app)&&(app!=null)){
			agenda.add(trovaIndice(app), app);
			return true;
		} else
			return false;
	}
	
	/*Metodo booleano che mi controlla se l'appuntamento è già presente all'interno dell'agenda,ritornando
	 * true nel caso non collida con altri appuntamenti,false altrimenti. */
	private boolean controlloApp(Appuntamento app){
		if(agenda.isEmpty())
			return true;
		for(Appuntamento e:agenda){
			if(e.getData().toString().equals(app.getData().toString()))
				if(!Orario.checkOrarioCron(e.getOrarioFine(), app.getOrario())){
					if(!Orario.checkOrarioCron(app.getOrarioFine(), e.getOrario())){
						return false;
					}
				}
		}
		return true;
	}
	
	/*Metodo che ritorna la posizione in cui dover inserire l'appuntamento per far sì che rispetti
	 * l'ordine cronologico.*/
	
	private int trovaIndice(Appuntamento app){
		int index = 0;
		for(Appuntamento e:agenda){
			if(Appuntamento.checkAppuntamento(app, e)){
				return index;
			}
			index++;
		}
		return index;
	}
	
	/**
	 * Metodo che modifica un appuntamento. L'appuntamento da modificare viene temporaneamente
	 * rimosso; se i nuovi parametri non creano conflitti con altri appuntamenti già esistenti,
	 * l'appuntamento modificato viene inserito, altrimenti viene ripristinato quello originale.
	   Ritorna true se è stato modificato con successo l'appuntamento; altrimenti false. 
	 */
	public boolean modificaAppuntamento(Appuntamento app, Appuntamento mod){
		int index = agenda.indexOf(app);
		agenda.remove(app);
		if(controlloApp(mod)){
			agenda.add(trovaIndice(mod), mod);
			return true;
		} else {
			agenda.add(index, app);
			return false;
		}
	}
	
	/**
	 * Metodo che rimuove un appuntamento dall'agenda su cui è chiamato.
	 * Ritorna true se è stato rimosso con successo l'appuntamento; altrimenti false.
	 */
	public boolean rimuoviAppuntamento(Appuntamento app){
		return agenda.remove(app);
	}
	

	/*Metodo che cerca l'appuntamento passato come paramentro nella Stringa nome. */
	
	public Vector<Appuntamento> cercaAppuntamento(String nome){
		Vector<Appuntamento> ricerca = new Vector<Appuntamento>();
		for(Appuntamento e:agenda){
			if(e.getNome().equals(nome))
				ricerca.add(e);
		}
		return ricerca;
	}
	
	/**
	 * Metodo che cerca un appuntamento per data.
	 * @param data - Data da cercare
	 * @return Ritorna un vettore contenente tutti gli appuntamenti in cui la data
	 * è uguale al parametro passato.
	 */
	public Vector<Appuntamento> cercaAppuntamento(Data data){
		Vector<Appuntamento> ricerca = new Vector<Appuntamento>();
		for(Appuntamento e:agenda){
			if(e.getData().toString().equals(data.toString()))
				ricerca.add(e);
		}
		return ricerca;
	}
	
	/*Metodo che ricerca uno o più appuntamenti in un range cronologico dalla data di inizio a quella di fine,passate
	 * come parametro. 
	 */
	public Vector<Appuntamento> cercaAppuntamento(Data inizio,Data fine){
		Vector<Appuntamento> ricerca = new Vector<Appuntamento>();
		for(Appuntamento e:agenda){
			Data c = e.getData();
			if(e.getData().checkDataCron(inizio, c) && e.getData().checkDataCron(c, fine))
				ricerca.add(e);
		}
		return ricerca;
	}

	/*Metodo che stampa tutti gli appuntamenti ordinati per data */
	public String stampaAgenda() throws AgendaVuotaException{
		if(!agenda.isEmpty()){
			String s = "";
			for(Appuntamento e:agenda)
				s+="*** Appuntamento:\n"+e.toString();
			return s;
		}else
			throw new AgendaVuotaException();
	}

	/**
	 * Metodo che calcola la dimensione del vettore (il numero di appuntamenti nell'agenda).
	 * @return Ritorna il numero di appuntamenti contenuti nell'agenda su cui è chiamata.
	 */
	public int getDim(){
		return agenda.size();
	}
	/**
	 * Metodo che trova in modo univoco gli appuntamenti.
	 * @param data - oggetto Data
	 * @param orario - oggetto Orario
	 * @return Ritorna l'appuntamento cercato se è presente nell'agenda; altrimenti null.
	 */
	public Appuntamento trovaAppuntamento(Data data, Orario orario){
		Vector<Appuntamento> giorno = new Vector<Appuntamento>();
		giorno = cercaAppuntamento(data);
		for(Appuntamento e:giorno){
			if(e.getOrario().toString().equals(orario.toString()))
				return e;
		}
		return null;
	}
	
	/**
	 * Metodo che scrive su un file gli appuntamenti contenuti nell'agenda su cui è chiamato.
	 * Viene chiamato tutte le volte che si esce.
	 */
	
	public void scriviLog(){
		scriviFile(percorso);
	}
	
	public void scriviFile(String file){
		try {
			PrintWriter out = new PrintWriter(new File(file));
			for(Appuntamento e:agenda)
				out.print("*** Appuntamento:\n"+e.toString()+"\n");
			out.close();
		} catch (IOException e){
			e.printStackTrace();
		}
	}
	
	public int leggiFile(String file){
		int totale = 0;
		try {
			BufferedReader input = new BufferedReader(new FileReader(file));
			String linea = input.readLine();
			Appuntamento e = null;
			while(linea!=null){
				if(linea.contains("***")){
					if(e!=null)
						if(this.inserisciAppuntamento(e))
							totale++;
					e = new Appuntamento();
				}else if(linea.contains("Data:")){
					try{
						Data d = Data.creaData(linea.substring(6));
						e.setData(d);
					}catch(DataException e1){
						e1.printStackTrace();
					}
				} else if(linea.contains("Orario inizio:")){
					try{
						Orario o = Orario.creaOrario(linea.substring(15));
						e.setOrario(o);
					}catch(OraException e2){
						e2.printStackTrace();
					}
				} else if(linea.contains("Durata:")){
					int d = Integer.parseInt((linea.substring(8)));
					e.setDurata(d);
				} else if(linea.contains("Nome:")){
					e.setNome(linea.substring(6));
				} else if(linea.contains("Luogo:")){
					e.setLuogo(linea.substring(7));
				}
				linea = input.readLine();
			}
			if(this.inserisciAppuntamento(e))
				totale++;
			input.close();
		} catch (IOException e){
			e.printStackTrace();
		}
		return totale;
	}
}


