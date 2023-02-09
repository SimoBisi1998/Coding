package codice;

import java.util.Vector;

public class GestioneAgenda {
	static Agenda agenda = new Agenda();
	
	public static void main(String[] args) {
		chiamaB();
		chiamaH();
		String s;
		char c = '.';
		do{
			s = Input.readString("\nComando: ");
			if(s.length()!=1){
				System.out.println("Errore.");
				continue;
			} else
				c = s.charAt(0);
			switch(c){
				case 'i':
					chiamaI();
					break;
				case 'r':
					chiamaR();
					break;
				case 'm':
					chiamaM();
					break;
				case 'c':
					chiamaC();
					break;
				case 's':
					chiamaS();
					break;
				case 'w':
					chiamaW();
					break;
				case 'l':
					chiamaL();
					break;
				case 'e':
					chiamaE();
					break;
				case 'h':
					chiamaH();
					break;
				default:
					System.out.println("Errore!");
					break;
			}
		}while(c!='e');
	}
	
	public static void chiamaH(){
		System.out.println("\nInserire un comando:\ni - inserisci un appuntamento");
		System.out.println("r - rimuovi un appuntamento\nm - modifica un appuntamento");
		System.out.println("c - cerca un appuntamento\ns - stampa gli appuntamenti");
		System.out.println("w - scrivi su file\nl - leggi da file\nh - help\ne - esci");
	}

	public static void chiamaI(){
		Appuntamento app = new Appuntamento();
		boolean flag = false;
		while(!flag){
			try {
				app.setData(Input.readString("Data: "));
				flag = true;
			} catch(DataException e){
				System.out.println("Formato errato - gg-mm-aaaa");
			}
		}
		while(flag){
			try{
				app.setOrario(Input.readString("Orario: "));
				flag = false;
			} catch(OraException e){
				System.out.println("Formato errato - hh:mm");
			}
		}
		while(!flag){
			try{
				app.setDurata(Input.readInt("Durata in minuti: "));
				flag = true;
			} catch(NumberFormatException e ){
				System.out.println("Formato errato - numero intero!");
			}
		}
		app.setNome(Input.readString("Inserisci il nome: "));
		app.setLuogo(Input.readString("Inserisci il luogo: "));
		if(agenda.inserisciAppuntamento(app))
			System.out.println("Appuntamento inserito con successo.");
		else
			System.out.println("Non è stato possibile inserire l'appuntamento.");
	}
	
	public static void chiamaR(){
		boolean flag = false;
		Data d = null;
		Orario o = null;
		System.out.print("Inserisci data e ora dell'appuntamento da eliminare.\n");
		while(!flag){
			try{
				d = Data.creaData(Input.readString("Data: "));
				flag = true;
			}catch(DataException e ){
				System.out.println("Formato errato - gg-mm-aaaa");
			}
		}
		while(flag){
			try {
				o = Orario.creaOrario(Input.readString("Orario: "));
				flag = false;
			} catch (OraException e){
				System.out.println("Formato errato - hh:mm");
			}
		}
		Appuntamento e = agenda.trovaAppuntamento(d,o);
		if(e!=null){
			agenda.rimuoviAppuntamento(e);
			System.out.println("Rimosso con successo.");
		}else
			System.out.println("Non è stato possibile rimuovere l'appuntamento.");
	}
	
	public static void chiamaM(){
		boolean flag = false;
		Data d = null;
		Orario o = null;
		System.out.println("Inserire data e ora dell'appuntamento da modificare.");
		while(!flag){
			try{
				d = Data.creaData(Input.readString("Data: "));
				flag = true;
			}catch(DataException e ){
				System.out.println("Formato errato - gg-mm-aaaa");
			}
		}
		while(flag){
			try {
				o = Orario.creaOrario(Input.readString("Orario: "));
				flag = false;
			} catch (OraException e){
				System.out.println("Formato errato - hh:mm");
			}
		}
		Appuntamento old = agenda.trovaAppuntamento(d,o);
		if(old!=null){
			System.out.println("Appuntamento da modificare:\n"+old.toString());
			System.out.println("Inserire i nuovi valori dell'appuntamento. Per non modificarli, riscriverli.");
			d = null;
			o = null;
			while(!flag){
				try{
					d = Data.creaData(Input.readString("Data: "));
					flag = true;
				}catch(DataException e ){
					System.out.println("Formato errato - gg-mm-aaaa");
				}
			}
			while(flag){
				try {
					o = Orario.creaOrario(Input.readString("Orario: "));
					flag = false;
				} catch (OraException e){
					System.out.println("Formato errato - hh:mm");
				}
			}
			int durata = Input.readInt("Nuova durata (in minuti): ");
			String nome = Input.readString("Nuovo nome: ");
			String luogo = Input.readString("Nuovo luogo: ");
			Appuntamento mod = new Appuntamento(d,o,durata,nome,luogo);
			if(agenda.modificaAppuntamento(old, mod))
				System.out.println("Appuntamento modificato con successo.");
			else
				System.out.println("Appuntamento non modificabile con questi nuovi parametri.");
		}else
			System.out.println("Appuntamento non esistente.");
	}
	
	public static void chiamaC(){
		Vector<Appuntamento> lis = new Vector<Appuntamento>();
		switch(Input.readChar("d - cerca per data\nn - cerca per nome\nComando: ")){
			case 'd':
				boolean flag = false;
				Data d = null;
				while(!flag){
					try{
						d = Data.creaData(Input.readString("Data: "));
						flag = true;
					}catch(DataException e ){
						System.out.println("Formato errato - gg-mm-aaaa");
					}
				}
				lis = agenda.cercaAppuntamento(d);
				if(lis.isEmpty())
					System.out.println("La ricerca non ha fornito risultati.");
				else {
					for(Appuntamento e:lis){
						System.out.println(e.toString());
					}
				}
				break;
			case 'n':
				lis = agenda.cercaAppuntamento(Input.readString("Inserisci il nome: "));
				if(lis.isEmpty())
					System.out.println("La ricerca non ha fornito risultati.");
				else {
					for(Appuntamento e:lis){
						System.out.println(e.toString());
					}
				}
				break;
			default:
				System.out.println("Errore.");
				break;
		}
	}
	
	public static void chiamaS(){
		String gigaString = "";
		try {
			gigaString = agenda.stampaAgenda();
			System.out.print(gigaString);
		}catch(AgendaVuotaException e){
			System.out.println("Attenzione! Agenda vuota.");
		}
	}
	
	public static void chiamaW(){
		agenda.scriviFile(Input.readString("Inserisci il nome del file: "));
	}
	
	public static void chiamaL(){
		int tot = agenda.leggiFile(Input.readString("Inserisci il nome del file: "));
		if(tot==0)
			System.out.println("Nessun appuntamento letto da file.");
		else
			System.out.println("Inseriti correttamente "+tot+" appuntamenti");
	}
	
	public static void chiamaE(){
		agenda.scriviLog();
		System.out.println("Uscita.");
	}
	
	private static void chiamaB(){
		System.out.println("\nBenvenuto figlio di puttana, questa è l'agenda.");
	}
}
