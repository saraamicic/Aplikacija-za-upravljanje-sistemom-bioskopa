package rva.implementations;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import rva.models.Bioskop;
import rva.repositories.BioskopRepository;
import rva.services.BioskopService;

@Component
public class BioskopServiceImpl implements BioskopService {

	//dopustamo springu da injektuje neki objekat za nas kada nam treba, mi ne mozemo napraviti objekat interfejsa ovde
	//pa nam je zato potrebna injekcija (svi objekti moraju biti anotirani)
	
	@Autowired
	private BioskopRepository repo;
	
	@Override
	public List<Bioskop> getAll() {
		return repo.findAll();
	}

	@Override
	public boolean existById(long id) {
		return repo.existsById(null);
		
	}

	@Override
	public Bioskop create(Bioskop body) {
		return repo.save(body);
	}

	@Override
	public Optional<Bioskop> update(Bioskop body, long id) {
		
		//hocemo da azuriramo samo ono sto vec postoji
		if(existById(id))
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
	public List<Bioskop> getBioskopByNaziv(String naziv) {
		return repo.findByNazivLike(naziv);
	}

}
