package rva.models;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.SequenceGenerator;

@Entity
public class Film {

	@Id
	@SequenceGenerator(name = "film_seq", sequenceName = "film_seq", allocationSize=1) // za koliko ce se sekvenca povecavati i kako se zove
	@GeneratedValue (strategy = GenerationType.SEQUENCE , generator = "film_seq")
	private long id;
	private String naziv;
	private int recenzija;
	private int trajanje;
	private String zanr;
	
	@OneToMany(mappedBy="film", cascade=CascadeType.ALL)
	private List <Rezervacija> rezervacije;
	
	public Film (){
		
	}
	
	public Film(long id, String naziv, int recenzija, int trajanje, String zanr) {
		super();
		this.id = id;
		this.naziv = naziv;
		this.recenzija = recenzija;
		this.trajanje = trajanje;
		this.zanr = zanr;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}


	public String getNaziv() {
		return naziv;
	}


	public void setNaziv(String naziv) {
		this.naziv = naziv;
	}


	public int getRecenzija() {
		return recenzija;
	}


	public void setRecenzija(int recenzija) {
		this.recenzija = recenzija;
	}


	public int getTrajanje() {
		return trajanje;
	}


	public void setTrajanje(int trajanje) {
		this.trajanje = trajanje;
	}


	public String getZanr() {
		return zanr;
	}


	public void setZanr(String zanr) {
		this.zanr = zanr;
	}
	
	
	
	
}
