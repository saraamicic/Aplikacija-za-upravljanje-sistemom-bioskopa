package rva.models;

import java.util.Date;

public class Rezervacija {

	private long id;
	private int brojOsoba;
	private double cenaKarte;
	private Date datum;
	private boolean placeno;
	
	public Rezervacija(long id, int brojOsoba, double cenaKarte, Date datum, boolean placeno) {
		super();
		this.id = id;
		this.brojOsoba = brojOsoba;
		this.cenaKarte = cenaKarte;
		this.datum = datum;
		this.placeno = placeno;
	}
	
	
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public int getBrojOsoba() {
		return brojOsoba;
	}
	public void setBrojOsoba(int brojOsoba) {
		this.brojOsoba = brojOsoba;
	}
	public double getCenaKarte() {
		return cenaKarte;
	}
	public void setCenaKarte(double cenaKarte) {
		this.cenaKarte = cenaKarte;
	}
	public Date getDatum() {
		return datum;
	}
	public void setDatum(Date datum) {
		this.datum = datum;
	}
	public boolean isPlaceno() {
		return placeno;
	}
	public void setPlaceno(boolean placeno) {
		this.placeno = placeno;
	}
	
	
	
	
}
