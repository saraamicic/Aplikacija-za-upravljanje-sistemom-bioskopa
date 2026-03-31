package rva.services;

import java.util.List;

import org.springframework.stereotype.Service;

import rva.models.Bioskop;

//iz crud servisa kupimo sve napravljene metode, a dodajemo one iz repoz u servis
@Service
public interface BioskopService extends CrudService<Bioskop> {
	List<Bioskop> getBioskopByNaziv (String naziv);
}
