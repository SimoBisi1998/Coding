package com.example.archiver;
import java.io.BufferedInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.sql.Connection;

import org.apache.commons.io.IOUtils;
import org.eclipse.paho.client.mqttv3.IMqttDeliveryToken;
import org.eclipse.paho.client.mqttv3.MqttCallback;
import org.eclipse.paho.client.mqttv3.MqttClient;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.eclipse.paho.client.mqttv3.MqttMessage;
import org.json.JSONException;
import org.json.JSONObject;

public class SubscribeCallback extends Thread implements MqttCallback{
	
	public Connection connect;
	public static MqttMessage status;

	@Override
	public void connectionLost(Throwable cause) {
		Subscriber sub = new Subscriber("");
		try {
			sub.reconnect();
		} catch (MqttException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		System.out.println("CONNECTION LOST");

	}

	@Override
	public void messageArrived(String topic, MqttMessage message) throws Exception {
		System.out.println(message);
		if(topic.equals("reparto/paziente/getstatus/id")) {
			this.status = message;
			/*Thread t = new Thread(this);
			t.start();*/
		}else {
			System.out.println("Message arrived in Archiver: "+message);
			if(message!=null) {
				final Publisher pub = new Publisher("");
	 	 		pub.postJson(message);
	 	 		
			}
		}
	}

	@Override
	public void deliveryComplete(IMqttDeliveryToken token) {
		// TODO Auto-generated method stub

	}
	
	/*@Override
	public void run() {
		System.out.println("SEI QUA");
		URL url;
		try {
			
			url = new URL("http://79.50.75.82:5000/readstatus/getstatus");
			HttpURLConnection connection = (HttpURLConnection) url.openConnection();
			connection.setConnectTimeout(5000);
	        connection.setRequestMethod("POST");
	        connection.setRequestProperty("Content-Type","application/json");
	        connection.setRequestProperty("Accept", "application/json");
	        connection.setDoOutput(true);
	        connection.setDoInput(true);
	        
	        String payload = (this.status).toString();
	        byte[] out = payload.getBytes(StandardCharsets.UTF_8);
	        
	        OutputStream stream = connection.getOutputStream();
	        stream.write(out);
	        
	        System.out.println("MESSAGGIO INVIATO CORRETTAMENTE");
	        
	        //read response
	        InputStream in = new BufferedInputStream(connection.getInputStream());
	        String result = IOUtils.toString(in, "UTF-8");
	        
	        System.out.println(result);
	        in.close();
	        
	        connection.disconnect();
	        System.out.println("FINISH");
	        
		} catch (IOException e) {
			System.out.println(e.getMessage());
			e.printStackTrace();
		}
	}*/

}
