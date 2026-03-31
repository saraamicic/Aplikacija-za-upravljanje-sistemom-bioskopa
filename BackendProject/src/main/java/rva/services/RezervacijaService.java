package rva.services;

import java.util.List;

import org.springframework.stereotype.Service;

import rva.models.Film;
import rva.models.Rezervacija;
import rva.models.Sala;

@Service
public interface RezervacijaService extends CrudService<Rezervacija> {

	List<Rezervacija> getRezervacijaByPlaceno (boolean placeno);
	List <Rezervacija> getRezervacijaByFilm (Film film);
	List <Rezervacija> getRezervacijaBySala (Sala sala);
	
}
