package test;

import static org.junit.Assert.*;

import org.junit.Test;

import codice.Agenda;
import codice.Appuntamento;
import codice.Data;
import codice.DataException;
import codice.OraException;
import codice.Orario;

public class TestAgenda {
	private static Agenda agenda;

	@Test
	public void testInserisciAppuntamento() throws DataException, OraException {
		agenda = new Agenda();
		Appuntamento app = new Appuntamento("02-03-2021", "10:10", 90, "Ricevimento", "Uni upo");
		Appuntamento ap2 = new Appuntamento("04-04-2020", "10:10", 90, "Ricevimento", "Uni upo");
		Appuntamento ap3 = new Appuntamento("02-03-2019", "23:50", 20, "Spesa", "Supermercato");
		Appuntamento ap4 = new Appuntamento("02-03-2021", "11:00", 10, "Lavoro", "Ufficio");
		assertTrue(agenda.inserisciAppuntamento(app));
		assertTrue(agenda.inserisciAppuntamento(ap2));
		assertTrue(agenda.inserisciAppuntamento(ap3));
		assertFalse(agenda.inserisciAppuntamento(ap4));
		assertEquals(3,agenda.getDim());
	}
	@Test
    public void testRimuoviAppuntamento() throws DataException, OraException {
        agenda = new Agenda();
        Appuntamento app = new Appuntamento("02-03-2021", "10:10", 90, "Ricevimento", "Uniupo di Alessandria");
        Appuntamento ap2 = new Appuntamento("04-04-2010", "10:10", 90, "Ricevimento", "Uniupo di Alessandria");
        Appuntamento ap4 = new Appuntamento("02-03-2021", "11:00", 10, "Lavoro", "Ufficio");
        assertTrue(agenda.inserisciAppuntamento(app));
        assertTrue(agenda.inserisciAppuntamento(ap2));
        assertFalse(agenda.rimuoviAppuntamento(ap4));
        assertTrue(agenda.rimuoviAppuntamento(ap2));
        assertEquals(1,agenda.getDim());
    }
	
	@Test
	public void testModificaAppuntamento() throws DataException, OraException {
		agenda = new Agenda();
		Appuntamento app = new Appuntamento("02-03-2021", "10:10", 90, "Ricevimento", "Uni upo");
		Appuntamento ap2 = new Appuntamento("04-04-2019", "10:10", 90, "Ricevimento", "Uni upo");
		Appuntamento ap4 = new Appuntamento("02-03-2021", "10:10", 10, "Spesa","Supermercato");
		Appuntamento ap3 = new Appuntamento("02-03-2021", "10:16", 10, "Lavoro", "Ufficio");
		assertTrue(agenda.inserisciAppuntamento(app));
		assertTrue(agenda.inserisciAppuntamento(ap2));
		assertTrue(agenda.modificaAppuntamento(app,ap4));
		assertFalse(agenda.modificaAppuntamento(ap2, ap3));
	}

	@Test
	public void testCercaAppuntamentoString() throws DataException, OraException {
		agenda = new Agenda();
		Appuntamento app = new Appuntamento("02-03-2009", "10:10", 90, "Spesa", "Market");
		Appuntamento ap2 = new Appuntamento("04-04-2007", "10:10", 90, "Spesa", "Uni upo");
		Appuntamento ap3 = new Appuntamento("02-03-2009", "23:50", 20, "Lavoro", "Ufficio");
		assertTrue(agenda.inserisciAppuntamento(app));
		assertTrue(agenda.inserisciAppuntamento(ap2));
		assertTrue(agenda.inserisciAppuntamento(ap3));
		assertTrue(agenda.cercaAppuntamento("Spesa").size()==2);
		assertTrue(agenda.cercaAppuntamento("Lavoro").size()==1);
		assertFalse(agenda.cercaAppuntamento("incon").size()!=0);
	}

	@Test
	public void testCercaAppuntamentoData() throws DataException, OraException {
		agenda = new Agenda();
		Data dat1 = Data.creaData("02-03-2009");
		Data dat2 = Data.creaData("04-04-2007");
		Appuntamento app = new Appuntamento("02-03-2009", "10:10", 90, "Ricevimento", "Università di Alessandria");
		Appuntamento ap2 = new Appuntamento("04-04-2007", "10:10", 90, "Ricevimento", "Università di Alessandria");
		Appuntamento ap3 = new Appuntamento("02-03-2009", "23:50", 20, "Seratona", "Casa mia");
		assertTrue(agenda.inserisciAppuntamento(app));
		assertTrue(agenda.inserisciAppuntamento(ap2));
		assertTrue(agenda.inserisciAppuntamento(ap3));
		assertTrue(agenda.cercaAppuntamento(dat1).size()==2);
		assertTrue(agenda.cercaAppuntamento(dat2).size()==1);
	}
	
	@Test
	public void testTrovaAppuntamento() throws DataException, OraException {
		agenda = new Agenda();
		Data data1 = Data.creaData("02-03-2021");
		Data data2 = Data.creaData("12-04-2020");
		Orario ora1 = Orario.creaOrario("10:15");
		Orario ora2 = Orario.creaOrario("09:10");
		Appuntamento app = new Appuntamento("02-03-2021", "10:15", 90, "Spesa", "Supermercato");
		Appuntamento ap2 = new Appuntamento("12-04-2020", "09:11", 90, "Lavoro", "Ufficio");
		Appuntamento ap3 = new Appuntamento("02-03-2021", "23:50", 20, "Compleanno", "Casa amico");
		assertTrue(agenda.inserisciAppuntamento(app));
		assertTrue(agenda.inserisciAppuntamento(ap2));
		assertTrue(agenda.inserisciAppuntamento(ap3));
		assertTrue(agenda.trovaAppuntamento(data1, ora1)!=null);
		assertTrue(agenda.trovaAppuntamento(data2, ora2)==null);
	}
}
