package rva.models;

public class Sala {
	
	private long id;
	private int kapacitet;
	private int brojRedova;
	
	
	public Sala(long id, int kapacitet, int brojRedova) {
		super();
		this.id = id;
		this.kapacitet = kapacitet;
		this.brojRedova = brojRedova;
	}
	
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public int getKapacitet() {
		return kapacitet;
	}
	public void setKapacitet(int kapacitet) {
		this.kapacitet = kapacitet;
	}
	public int getBrojRedova() {
		return brojRedova;
	}
	public void setBrojRedova(int brojRedova) {
		this.brojRedova = brojRedova;
	}
	
	
	

}
