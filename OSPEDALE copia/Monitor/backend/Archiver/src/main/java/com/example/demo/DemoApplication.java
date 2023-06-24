package com.example.demo;
import java.util.logging.FileHandler;
import java.util.logging.Logger;
import java.util.logging.SimpleFormatter;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class DemoApplication {

	
	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
		 
		
		try {
 			final Subscriber subscriber = new Subscriber("");
 	 		subscriber.start();
 	 		
 	 		
 	 		Logger logger = Logger.getLogger("archiver_log");
 	 		// This block configure the logger with handler and formatter  
 	        FileHandler fh = new FileHandler("/Users/simobisi/Downloads/demo/archiver_log.log");  
 	        logger.addHandler(fh);
 	        SimpleFormatter formatter = new SimpleFormatter();  
 	        fh.setFormatter(formatter);  

 	        // the following statement is used to log any messages  
 	        logger.info("My first log");  
 	 		
 		}catch(Exception e) {
 			System.out.println(e.getMessage());
 		}
	}

}
