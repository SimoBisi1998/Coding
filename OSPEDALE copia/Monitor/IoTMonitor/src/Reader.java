import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;

import org.json.JSONException;
import org.json.JSONObject;

public class Reader {
	public synchronized static JSONObject readStatus(String filePath) {
		String next = "";
		JSONObject json = new JSONObject();
		try {
			BufferedReader reader = new BufferedReader(new FileReader("/Users/simobisi/Desktop/OSPEDALE/Monitor/IoTMonitor/Status/"+filePath));
			int i = 0;
			try {
				while(next!=null) {
					i++;
					if(i==7) break;
					next = reader.readLine();
					String param = next.split(":")[0];
					String value = next.split(":")[1].split(";")[0];
					json.put(param,Integer.parseInt(value.trim()));
				}
				reader.close();
			} catch (IOException | JSONException e) {
				System.out.println(e.getMessage());
				e.printStackTrace();
			}
		} catch (FileNotFoundException e) {
			System.out.println(e.getMessage());
			e.printStackTrace();
		}
		return json;
	}
}
