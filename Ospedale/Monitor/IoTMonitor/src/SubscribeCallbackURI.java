
import java.sql.Connection;

import org.eclipse.paho.client.mqttv3.IMqttDeliveryToken;
import org.eclipse.paho.client.mqttv3.MqttCallback;
import org.eclipse.paho.client.mqttv3.MqttMessage;
import org.json.JSONObject;

public class SubscribeCallbackURI implements MqttCallback {
	
	public Connection connect;

	@Override
	public void connectionLost(Throwable cause) {
		System.out.println("CONNECTION LOST IOT_MONITOR");

	}

	@Override
	public void messageArrived(String topic, MqttMessage message) throws Exception {
		if(topic.equals("reparto/newpaziente")) {
			System.out.println("Message arrived in IoT_Monitor: "+message);
			Writer.writeStatus(message);
		}else {
			System.out.println("Message arrived to get status from the patient number : "+message.toString());
			JSONObject response = Reader.readStatus("status_"+message.toString()+".txt");
			Publisher pubMonitor = new Publisher("");
			pubMonitor.start();
			pubMonitor.publish(response,topic);
		}
		
		
	}

	@Override
	public void deliveryComplete(IMqttDeliveryToken token) {
		// TODO Auto-generated method stub
	}
	

}
