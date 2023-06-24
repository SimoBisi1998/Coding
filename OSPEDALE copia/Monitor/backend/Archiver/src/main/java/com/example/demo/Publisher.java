package com.example.demo;
import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URI;
import java.net.URL;
import java.net.URLConnection;
import java.nio.charset.StandardCharsets;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Statement;

import org.apache.hc.client5.http.classic.HttpClient;
import org.apache.hc.client5.http.classic.methods.HttpPost;
import org.apache.hc.client5.http.impl.classic.HttpClientBuilder;
import org.apache.hc.core5.http.HttpResponse;
import org.apache.hc.core5.http.io.entity.StringEntity;
import org.eclipse.paho.client.mqttv3.MqttClient;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.eclipse.paho.client.mqttv3.MqttMessage;
import org.apache.commons.io.IOUtils;
import org.json.JSONException;
import org.json.JSONObject;

public class Publisher {

	public static final String broker_url = "tcp://localhost:1883";
	public static final String topic_newStatus = "report/paziente/newstatus";
	public Connection connect;
	
	public MqttClient mqtt_pub;
	public String client = "archiver_pub";
	
	public Publisher(String hosturl) {
		String url="";
		if(hosturl=="") {
			url = broker_url;
		}else {
			url = hosturl;
		}
		
		try {
			mqtt_pub = new MqttClient(url,client);
		} catch (MqttException e) {
			System.out.println(e.getMessage());
			e.printStackTrace();
		}
	}
	
	public Connection connectToDatabase() {
		try {
			connect = DriverManager.getConnection("jdbc:sqlite:../../ospedale.db");
			if(connect!=null) {
				System.out.println("Connection established with database");
			}else {
				System.out.println("Connection error");
			}
		}catch(Exception e) {
			System.out.println(e.getMessage());
			e.printStackTrace();
		}
		return connect;
	}
	
	public void postJson(MqttMessage message) {
		try {
			/*Connection conn = connectToDatabase();
			System.out.println(conn);
			JSONObject jsonmsg = new JSONObject(new String(message.getPayload()));
			Statement st = connect.createStatement(); 
			String sql = "INSERT INTO paziente(id_paziente,nome,cognome,telefono,id_reparto,pressioneArteriosa,frequenzaCardiaca,frequenzaRespiratoria,saturazioneOssigeno,statoDiCoscienza,Dolore) VALUES(?,?,?,?,?,?,?,?,?,?,?)";
			PreparedStatement pstmt = conn.prepareStatement(sql);
			pstmt.setInt(1, 1);
			pstmt.setString(2, "alessandro");
			pstmt.setString(3, "borelli");
			pstmt.setInt(4, 123235);
			pstmt.setInt(5, 1);
			pstmt.setString(6,jsonmsg.toString().split(",")[0].split(":")[1]);
			pstmt.setString(7,jsonmsg.toString().split(",")[1].split(":")[1]);
			pstmt.setString(8,jsonmsg.toString().split(",")[2].split(":")[1]);
			pstmt.setString(9,jsonmsg.toString().split(",")[3].split(":")[1]);
			pstmt.setString(10,jsonmsg.toString().split(",")[4].split(":")[1]);
			pstmt.setString(11, jsonmsg.toString().split(",")[5].split(":")[1].split("}")[0]+")");
			pstmt.executeUpdate();
			System.out.println("Insert successfully");
			connect.close();*/
			
			sendJsonToWS(message);
		} catch (Exception e) {
			System.out.println("Insert fail");
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	public void sendJsonToWS(MqttMessage message) {
		try {
			JSONObject jsonmsg = new JSONObject(new String(message.getPayload()));
			URL url = new URL("http://localhost:5000/showstatus");
			
			HttpURLConnection connection = (HttpURLConnection) url.openConnection();
			connection.setConnectTimeout(5000);
	        connection.setRequestMethod("POST");
	        connection.setRequestProperty("Content-Type","application/json");
	        connection.setRequestProperty("Accept", "application/json");
	        connection.setDoOutput(true);
	        connection.setDoInput(true);
	        
	        String payload = jsonmsg.toString();
	        byte[] out = payload.getBytes(StandardCharsets.UTF_8);
	        
	        OutputStream stream = connection.getOutputStream();
	        stream.write(out);
	        
	        
	        
	        //read response
	        InputStream in = new BufferedInputStream(connection.getInputStream());
	        String result = IOUtils.toString(in, "UTF-8");
	        
	        System.out.println(result);
	        in.close();
	        
	        connection.disconnect();
		} catch (Exception ex) {
			System.out.println(ex.getMessage());
        	System.out.println("Failed successfully");
		}
	}
	
}
