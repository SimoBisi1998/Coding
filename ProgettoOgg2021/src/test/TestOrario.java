package test;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;
import static org.junit.jupiter.api.Assertions.*;

import java.util.function.BooleanSupplier;

import org.junit.jupiter.api.Test;

import codice.OraException;
import codice.Orario;

class TestOrario {

	@Test
	public void testCheckDurata() throws OraException{ //test controllo ore e minuti corretti
		Orario orario = Orario.creaOrario("15:45");
		assertTrue(orario.checkOrario("15:45"));
		assertFalse(orario.checkOrario("01:62"));
		assertTrue(orario.checkOrario("00:00"));
		assertFalse(orario.checkOrario("24:59"));
	}
	@Test
	public void testCheckOrarioCron() throws OraException{ //test orario prec e next
		Orario or1 = Orario.creaOrario("10:10");
		Orario or2 = Orario.creaOrario("10:09");
		Orario or3 = Orario.creaOrario("00:00");
		assertTrue(Orario.checkOrarioCron(or2, or1));
		assertTrue(Orario.checkOrarioCron(or3, or2));
		assertFalse(Orario.checkOrarioCron(or2, or3));
	}
	
	@Test
	public void testCheckDurataOre() throws OraException{ //test 24 ore da non sforare
		Orario orario = Orario.creaOrario("23:30");
		assertTrue(orario.checkDurata(29));
		assertFalse(orario.checkDurata(30));
	}

}
