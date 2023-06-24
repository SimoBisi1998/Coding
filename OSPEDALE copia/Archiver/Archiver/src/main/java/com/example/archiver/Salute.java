package com.example.archiver;

import java.util.ArrayList;

public class Salute {
	private String pressioneArteriosa;
	private String frequenzaCardiaca;
	private String frequenzaRespiratoria;
	private String saturazioneOssigeno;
	private String statoCoscienza;
	private String dolore;
	public static ArrayList<Paziente> array;
	
	public Salute(String pressioneArteriosa,String frequenzaCardiaca,String frequenzaRespiratoria,String saturazioneOssigeno, String statoCoscienza, String dolore) {
		this.pressioneArteriosa = pressioneArteriosa;
		this.frequenzaCardiaca = frequenzaCardiaca;
		this.frequenzaRespiratoria = frequenzaRespiratoria;
		this.saturazioneOssigeno = saturazioneOssigeno;
		this.statoCoscienza = statoCoscienza;
		this.dolore = dolore;
	}
	
	public ArrayList<Paziente> allocaPaziente(Paziente paziente) {
		this.array.add(paziente);
		return array;		
	}
}
