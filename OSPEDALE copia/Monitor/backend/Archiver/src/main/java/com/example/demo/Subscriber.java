package com.example.demo;
import java.sql.Connection;
import java.util.Timer;
import java.util.TimerTask;

import org.eclipse.paho.client.mqttv3.MqttClient;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.json.JSONObject;

public class Subscriber {
	
	public static String broker_url = "tcp://localhost:1883";
	public static String topic_sub = "reparto/paziente/nowstatus";
	public static String topic_pub = "reparto/paziente/newstatus";
	private MqttClient mqtt;
	
	
 	public static String archiver = "archiver-sub";
	
 	public Subscriber(String hosturl) {
 		String url = "";
 		try {
 	 		if(hosturl!="") {
 	 			url = hosturl;
 	 		}else {
 	 			url = broker_url;
 	 		}
 	 		
 	 		//new istance of mqttclient for the connection to mosquitto's broker
			mqtt = new MqttClient(url,archiver);
			
		} catch (MqttException e) {
			e.printStackTrace();
		}
 	}
 	

	public void start() {
		mqtt.setCallback(new SubscribeCallback());
		try {
			mqtt.connect();
			
			//subscribe to message broker
			mqtt.subscribe(topic_sub);
			
			System.out.println("Subscriber is now listening on "+topic_sub);
			
		} catch (MqttException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		
		
	}
}
