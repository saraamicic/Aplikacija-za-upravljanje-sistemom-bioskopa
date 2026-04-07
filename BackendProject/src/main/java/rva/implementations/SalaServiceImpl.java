package rva.implementations;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import rva.models.Bioskop;
import rva.models.Sala;
import rva.repositories.SalaRepository;
import rva.services.SalaService;

@Component
public class SalaServiceImpl implements SalaService {

	@Autowired
	private SalaRepository repo;
	
	
	@Override
	public List<Sala> getAll() {
		return repo.findAll();
	}

	@Override
	public boolean existsById(long id) {
		return repo.existsById(id);
	}

	@Override
	public Sala create(Sala body) {
		return repo.save(body);
	}

	@Override
	public Optional<Sala> update(Sala body, long id) {
		
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
	public List<Sala> getSalaByKapacitet(int kapacitet) {
		return repo.findByKapacitetLessThan(kapacitet);
	}

	@Override
	public List<Sala> getSalaByBioskop(Bioskop bioskop) {
		return repo.findByBioskop(bioskop);
	}

	@Override
	public Optional<Sala> findById(long id) {
		// TODO Auto-generated method stub
		return repo.findById(id);
	}

}
