package com.example.archiver;
import java.sql.Connection;
import java.sql.Statement;
import java.util.logging.FileHandler;
import java.util.logging.Logger;
import java.util.logging.SimpleFormatter;
import java.sql.PreparedStatement;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Application{

	public static Logger logger = Logger.getLogger("archiver_log");
	
	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
		
		
		try {
			// This block configure the logger with handler and formatter  
 	        FileHandler fh = new FileHandler("/Users/simobisi/Desktop/OSPEDALE/Logger/archiver_log.log");  
 	        logger.addHandler(fh);
 	        SimpleFormatter formatter = new SimpleFormatter();  
 	        fh.setFormatter(formatter);  
 	        
 	        
 			final Subscriber subscriber = new Subscriber("");
 	 		subscriber.start();
 	 		
 	        // the following statement is used to log any messages  
 	        //logger.info("My first log");  
 	        System.out.println("");
 	        System.out.println("****************");
 	        System.out.println("SPRING_APPLICATION STARTED ✓");
 	        System.out.println("ARCHIVER_SUBSCRIBER STARTED ✓");
 	        System.out.println("****************");
 	        System.out.println("");
 	        logger.info("SPRING_APPLICATION STARTED ✓");
 	        logger.info("ARCHIVER_SUBSCRIBER STARTED ✓");
 		}catch(Exception e) {
 			logger.info(e.getMessage());
 			System.out.println(e.getMessage());
 		}
	}

}
