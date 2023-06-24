import java.io.BufferedWriter;
import java.io.FileReader;
import java.io.FileWriter;
import java.util.ArrayList;
import java.util.concurrent.ThreadLocalRandom;

import org.eclipse.paho.client.mqttv3.MqttMessage;
import org.json.JSONObject;

import com.example.archiver.Paziente;
import com.example.archiver.Salute;

public class Writer { 
	

	public static void writeStatus(MqttMessage message) {
		try {
			JSONObject jsonmsg = new JSONObject(new String(message.getPayload()));
			int array[] = new int[6];
			BufferedWriter buf = new BufferedWriter(new FileWriter("Status/status"+"_"+jsonmsg.getLong("id_paziente")+".txt"));
			for(int i=0;i<5;i++) {
				array[i] = ThreadLocalRandom.current().nextInt(10, 99 + 1);
			}
			buf.write("Pressione Arteriosa " + ": " + array[0]);
			buf.newLine();
			buf.write("Frequenza Cardiaca " + ": " + array[1]);
			buf.newLine();
			buf.write("Frequenza Respiratoria " + ": " + array[2]);
			buf.newLine();
			buf.write("Saturazione Ossigeno " + ": " + array[3]);
			buf.newLine();
			buf.write("Stato di Coscienza " + ": " + array[4]);
			buf.newLine();
			buf.write("Dolore " + ": " + array[5]);
			
			buf.close();
			System.out.println("FILE CREATED");
		}catch(Exception e) {
			LoggerFile.logger.info(e.getMessage());
		}
	}
}
