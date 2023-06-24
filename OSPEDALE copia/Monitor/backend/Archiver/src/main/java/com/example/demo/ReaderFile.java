package com.example.demo;
import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.ProtocolException;
import java.net.URI;
import java.net.URL;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse.BodyHandlers;
import java.nio.charset.StandardCharsets;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.time.Duration;

import org.apache.commons.io.IOUtils;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.security.crypto.bcrypt.BCrypt;

public class ReaderFile {

	
	public static boolean getCredentials() {
		URL url;
		
		try {
			
			String inputLine;
	        String result = "";
	        
			//set uri for the request 
			url = new URL("http://localhost:5000/readcredentials");
			HttpURLConnection connection = (HttpURLConnection) url.openConnection();
			
			//after 5s the connection will go down
			connection.setConnectTimeout(5000);
			
			//wait 15s to read data from HTTP GET
			connection.setReadTimeout(20000);
			
			//set the HTTP method
	        connection.setRequestMethod("GET");
	        
	        //set the type of data of the response from the server (need only json)
	        connection.setRequestProperty("Content-Type", "application/json");
	        
	        BufferedReader in = new BufferedReader(new InputStreamReader(connection.getInputStream()));
	        
			while ((inputLine = in.readLine()) != null)
				result = inputLine;
			
			JSONObject credentials = new JSONObject(result);
			verifyCredentials(credentials);
			
			//close inputStream
			in.close();
	        //disconnect from server
	        connection.disconnect();
		} catch (IOException | JSONException e) {
			System.out.println(e.getMessage());
			e.printStackTrace();
		}
		
		return true;
		
	}
	
	public static void verifyCredentials(JSONObject credentials) {
		Publisher pub = new Publisher("");
		boolean verify = false;
		Connection connect = pub.connectToDatabase();
		String hash = BCrypt.hashpw(credentials.toString().split(",")[1].split(":")[1],BCrypt.gensalt());
		try {
			String nome = credentials.toString().split(",")[0].split(":")[1].replace("\"","");
			String sql = "SELECT password FROM medico WHERE username ='"+credentials.toString().split(",")[1].split(":")[1].replace("\"","").split("}")[0]+"'";
			Statement st = connect.createStatement();
			
			//exec query to db
			ResultSet rs = st.executeQuery(sql);
			if(rs.next()) {
				String password = rs.getString("password");
				if(BCrypt.checkpw(credentials.toString().split(",")[0].split(":")[1].replace("\"",""), password)) {
					sendResponseToServer(credentials,verify=true);
				}
			}
			
			//connection closed
			connect.close();
		} catch (SQLException e) {
			System.out.println(e.getMessage());
			e.printStackTrace();
		}
	}
	
	public static void sendResponseToServer(JSONObject credentials, boolean verify ) {
		URL url;
		try {
			url = new URL("http://79.21.139.244:5000/verifycredentials");
			credentials.put("verify", verify);
			HttpURLConnection connection = (HttpURLConnection) url.openConnection();
			connection.setConnectTimeout(5000);
	        connection.setRequestMethod("POST");
	        connection.setRequestProperty("Content-Type","application/json");
	        connection.setRequestProperty("Accept", "application/json");
	        connection.setDoOutput(true);
	        connection.setDoInput(true);
	        
	        String payload = credentials.toString();
	        byte[] out = payload.getBytes(StandardCharsets.UTF_8);
	        OutputStream stream = connection.getOutputStream();
	        stream.write(out);
	        
	        //read response
	        InputStream in = new BufferedInputStream(connection.getInputStream());
	        String result = IOUtils.toString(in, "UTF-8");
	        
	        System.out.println(result);
	        in.close();
	        
	        connection.disconnect();
	        
		} catch (IOException | JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	

}
