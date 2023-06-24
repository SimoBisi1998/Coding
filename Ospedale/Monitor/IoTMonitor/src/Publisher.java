import java.util.Date;
import java.util.Timer;
import java.util.TimerTask;
import org.eclipse.paho.client.mqttv3.MqttClient;
import org.eclipse.paho.client.mqttv3.MqttConnectOptions;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.eclipse.paho.client.mqttv3.MqttMessage;
import org.eclipse.paho.client.mqttv3.MqttTopic;
import org.json.JSONException;
import org.json.JSONObject;

public class Publisher {
	public final String broker_url = "tcp://localhost:1883";
	public final String topic_pub = "reparto/paziente/nowstatus";
	public final String topic_pubStatus = "reparto/paziente/getstatus/id";
	private Date date = new Date();
	
	private MqttClient mqtt_pub;
	
	 String monitor = "monitor-"+Long.toString(date.getTime()) + "-pub";
	
	public Publisher(String hosturl) {
		String url = "";
		if(hosturl == "") {
			url = broker_url;
		}else {
			url = hosturl;
		}
		try {
			mqtt_pub = new MqttClient(url,monitor);
		} catch (MqttException e) {
			System.out.println(e.getMessage());
			e.printStackTrace();
		}
	}
	
	public void start() {

        try {
            MqttConnectOptions options = new MqttConnectOptions();
            options.setCleanSession(false);
            options.setWill(mqtt_pub.getTopic("reparto/paziente/nowstatus"), "I'm gone :(".getBytes(), 0, false);

            mqtt_pub.connect(options);
            
            /*if(mqtt_pub.isConnected()) {
            	//read actually status from file every 3000 seconds
                new Timer().scheduleAtFixedRate(new TimerTask(){
                    @Override
                    public void run(){
                       JSONObject obj = Reader.readStatus("prova.txt");
                       publish(obj,topic_pub);
                    }
                },0,3000);
            }*/
        } catch (MqttException e) {
            e.printStackTrace();
            System.exit(1);
        }
    }
	
	public void publish(JSONObject obj,String topic) {
		if(topic.equals("reparto/paziente/nowstatus")) {
			final MqttTopic messageTopic = mqtt_pub.getTopic(topic_pub);
			try {
				messageTopic.publish(new MqttMessage(obj.toString().getBytes()));
				System.out.println("Message sent to broker.");
			} catch (MqttException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		else {
			final MqttTopic messageTopic = mqtt_pub.getTopic(topic_pubStatus);
			try {
				System.out.println(obj);
				messageTopic.publish(new MqttMessage(obj.toString().getBytes()));
				System.out.println("Message sent to broker to topic :"+topic_pubStatus);
			} catch (MqttException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		
		
	}
	
	public static void main(String args[]) {
		final ControllerMonitor sub = new ControllerMonitor("");
		sub.start();
		final Publisher pub = new Publisher("");
		pub.start();
	}
}
