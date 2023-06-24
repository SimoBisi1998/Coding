import java.io.IOException;
import java.util.logging.FileHandler;
import java.util.logging.Logger;
import java.util.logging.SimpleFormatter;

public class LoggerFile {
	public static Logger logger = Logger.getLogger("monitor_log");
	
	public void createLogFile() {
		FileHandler fh;
		try {
			fh = new FileHandler("/Users/simobisi/Desktop/OSPEDALE/Logger/monitor.log");
			   logger.addHandler(fh);
		        SimpleFormatter formatter = new SimpleFormatter();  
		        fh.setFormatter(formatter);  
		} catch (SecurityException | IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}  
	     
		
	}

}
