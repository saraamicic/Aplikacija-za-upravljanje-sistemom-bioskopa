package rva.implementations;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import rva.models.Film;
import rva.models.Rezervacija;
import rva.models.Sala;
import rva.repositories.RezervacijaRepository;
import rva.services.RezervacijaService;
@Component
public class RezervacijaServiceImpl implements RezervacijaService {

	@Autowired
	private RezervacijaRepository repo;
	
	@Override
	public List<Rezervacija> getAll() {
		return repo.findAll();
	}

	@Override
	public boolean existsById(long id) {
		return repo.existsById(id);
	}

	@Override
	public Rezervacija create(Rezervacija body) {
		return repo.save(body);
	}

	@Override
	public Optional<Rezervacija> update(Rezervacija body, long id) {
		if(existsById(id))
		{
			body.setId(id);
			return Optional.of(repo.save(body));
		}
		
		return Optional.empty();
	}

	@Override
	public void delete(long id) {
		repo.deleteById(id);
	}

	@Override
	public List<Rezervacija> getRezervacijaByPlaceno(boolean placeno) {
		return repo.findByPlacenoEquals(placeno);
	}

	@Override
	public List<Rezervacija> getRezervacijaByFilm(Film film) {
		return repo.findByFilm(film);
	}

	@Override
	public List<Rezervacija> getRezervacijaBySala(Sala sala) {
		return repo.findBySala(sala);
	}

	@Override
	public Optional<Rezervacija> findById(long id) {
		// TODO Auto-generated method stub
		return repo.findById(id);
	}

}
