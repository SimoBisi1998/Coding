package com.example.archiver;

import java.net.URI;
import java.net.URISyntaxException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Optional;
import java.util.logging.Logger;

import org.eclipse.paho.client.mqttv3.MqttMessage;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.HttpMediaTypeNotAcceptableException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;


@RestController
public class APIRest extends Thread{
	public Logger logger = Logger.getLogger("archiver_log");
	public String newpaz;
	public String id_paziente;
	
	
	@PostMapping("/newlogin")
	public void logUser(@RequestBody String credentials) {
	    logger.info(credentials);
	  }
	
	@PostMapping("/newpaziente")
	public void insertPaziente(@RequestBody String paziente){
		try {
			this.newpaz  = paziente;
			
			JSONObject newpaziente = new JSONObject(paziente);
			String reparto = newpaziente.getString("reparto");
			
			//Paziente pazio = new Paziente(nome,cognome,telefono,Integer.parseInt(reparto));
			
			Connection conn = Static.connectToDatabase();
 	 		if(conn!=null) {
 	 			Statement st = conn.createStatement(); 
 				String sql = "INSERT INTO paziente(id_paziente,nome,cognome,telefono,id_reparto) VALUES(?,?,?,?,?)";
 				PreparedStatement pstmt = conn.prepareStatement(sql);
 				pstmt.setString(2, newpaziente.getString("nome"));
 				pstmt.setString(3, newpaziente.getString("cognome"));
 				pstmt.setString(4, newpaziente.getString("telefono"));
 				pstmt.setInt(5, Integer.parseInt(reparto));
 				pstmt.executeUpdate();
 				
 				ResultSet rs = pstmt.getGeneratedKeys();
 				long id=0;
 				
 				if (rs.next()) {
 				    id = rs.getLong(1);
 				    System.out.println("Inserted ID -" + id); // display inserted record
 				}
 				this.id_paziente = Long.toString(id);
 				System.out.println("Insert successfully");
 				conn.close();
 				
 				Thread t = new Thread(this);
 				t.start();
 			
 	 		}
		} catch (JSONException | SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	//dire al publisher del monitor che hai bisogno i dati del paziente "id_paziente"
	@GetMapping(value = "getpaziente/{id_paziente}",  produces = {MediaType.APPLICATION_JSON_VALUE})
	@ResponseBody
	public String getStatus(@PathVariable("id_paziente") int id_paziente) {
		//it works
		call(id_paziente);
		try {
			Thread.sleep(2000);
			HttpHeaders headers = new HttpHeaders(); 
			headers.add("Content-Type", "application/json");
			//JSONObject response = new JSONObject(new String(SubscribeCallback.status.getPayload()));
			//System.out.println("status:   " +response);
			return SubscribeCallback.status.toString();
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}

	private void call(int id_paziente) {
		Publisher pubSpring = new Publisher("");
		pubSpring.start(null, "");
		pubSpring.getStatusCalledByAPIRest(id_paziente);
		return;
		
	}

	@Override
	public void run() {
		try {
			JSONObject newPaziente = new JSONObject(this.newpaz);
			Publisher pub = new Publisher("");
			pub.start(newPaziente,this.id_paziente);
			
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}


