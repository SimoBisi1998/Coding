import org.eclipse.paho.client.mqttv3.MqttClient;
import org.eclipse.paho.client.mqttv3.MqttException;

import com.example.archiver.Application;
import com.example.archiver.SubscribeCallback;

public class ControllerMonitor {
	
	public static String broker_url = "tcp://localhost:1883";
	public static String topic_sub = "reparto/newpaziente";
	public static String topic_sendStatus = "reparto/paziente/getstatus";
	private MqttClient mqttController;
	
	
 	public static String monitor = "monitor-sub_01";
	
 	public ControllerMonitor(String hosturl) {
 		String url = "";
 		try {
 	 		if(hosturl!="") {
 	 			url = hosturl;
 	 		}else {
 	 			url = broker_url;
 	 		}
 	 		
 	 		//new istance of mqttclient for the connection to mosquitto's broker
			mqttController = new MqttClient(url,monitor);
			
		} catch (MqttException e) {
			Application.logger.info(e.getMessage());
			e.printStackTrace();
		}
 	}
 	

	public void start() {
		mqttController.setCallback(new SubscribeCallbackURI());
		try {
			mqttController.connect();
			
			//subscribe to message broker
			mqttController.subscribe(topic_sub);
			mqttController.subscribe(topic_sendStatus);
			
			System.out.println("Subscriber_monitor is now listening on :"
			+"-"+topic_sub+"\n"+
			"-"+topic_sendStatus+"\n");
			
		} catch (MqttException e) {
			Application.logger.info(e.getMessage());
			e.printStackTrace();
		}
		
		
		
	}

}
