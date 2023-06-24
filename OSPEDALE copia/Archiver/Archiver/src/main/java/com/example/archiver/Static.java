package com.example.archiver;

import java.sql.Connection;
import java.sql.DriverManager;

public class Static {
	
	
	public static Connection connectToDatabase() {
		Connection connect = null;
		try {
			connect = DriverManager.getConnection("jdbc:sqlite:../../ospedale.db");
			if(connect!=null) {
				System.out.println("Connection established with database..");
			}else {
				System.out.println("Connection error");
			}
		}catch(Exception e) {
			Application.logger.info(e.getMessage());
			e.printStackTrace();
		}
		return connect;
	}
}
