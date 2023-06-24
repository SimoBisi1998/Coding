package com.example.demo;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.Optional;


import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.http.MediaType;


@RestController
public class Prova {

	@GetMapping("/index")
	public String index() {
		System.out.println("eccoci");
		return "bella zio";
	}
}


