package com.example.demo;
import java.sql.Connection;

import org.eclipse.paho.client.mqttv3.IMqttDeliveryToken;
import org.eclipse.paho.client.mqttv3.MqttCallback;
import org.eclipse.paho.client.mqttv3.MqttMessage;

public class SubscribeCallback implements MqttCallback {
	
	public Connection connect;

	@Override
	public void connectionLost(Throwable cause) {
		System.out.println("CONNECTION LOST");

	}

	@Override
	public void messageArrived(String topic, MqttMessage message) throws Exception {
		System.out.println("Message arrived: "+message);
		if(message!=null) {
			final Publisher pub = new Publisher("");
 	 		pub.postJson(message);
		}
	}

	@Override
	public void deliveryComplete(IMqttDeliveryToken token) {
		// TODO Auto-generated method stub

	}

}
