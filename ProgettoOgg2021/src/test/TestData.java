package test;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;
import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;

import codice.Data;
import codice.DataException;

class TestData {

	@Test
	public void testCheckData(){
		assertFalse(Data.checkData("30-02-2005"));
		assertTrue(Data.checkData("01-01-2005"));
		assertTrue(Data.checkData("31-10-2012"));
		assertFalse(Data.checkData("32-10-2015"));
		assertFalse(Data.checkData("00-00-2010"));
	}
	
	@Test
	public void testCheckDataCron() throws DataException{
		Data dat1 = Data.creaData("01-01-2018");
		Data dat2 = Data.creaData("03-03-2015");
		Data dat3 = Data.creaData("04-03-2017");
		Data dat4 = Data.creaData("31-12-2020");
		assertFalse(Data.checkDataCron(dat1, dat2));
		assertTrue(Data.checkDataCron(dat2, dat3));
		assertFalse(Data.checkDataCron(dat2, dat2));
		assertFalse(Data.checkDataCron(dat4, dat1));
		toString();
	}
}
