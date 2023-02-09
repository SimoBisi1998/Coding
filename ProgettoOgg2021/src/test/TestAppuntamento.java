package test;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;

import codice.Appuntamento;
import codice.DataException;
import codice.OraException;

	public class TestAppuntamento {

		/*Test che verifica se la data passata come primo parametro,viene cronologicamente prima della seconda */
		@Test
		public void testCheckAppuntamento() throws DataException, OraException {
			Appuntamento ap1 = new Appuntamento("05-03-2020", "00:00", 90, "prova", "prova");
			Appuntamento ap2 = new Appuntamento("06-03-2020", "01:00", 1, "prova", "prova");
			Appuntamento ap3 = new Appuntamento("31-12-2020", "23:58", 3, "prova", "1-2-3 prova");
			assertTrue(Appuntamento.checkAppuntamento(ap1, ap2));
			assertFalse(Appuntamento.checkAppuntamento(ap3, ap1));
		}
	}


