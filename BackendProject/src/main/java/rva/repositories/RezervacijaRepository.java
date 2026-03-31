package rva.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import rva.models.Film;
import rva.models.Rezervacija;
import rva.models.Sala;

@Repository
public interface RezervacijaRepository extends JpaRepository<Rezervacija, Long> {

	List<Rezervacija> findByPlacenoEquals (boolean placeno);
	List <Rezervacija> findByFilm (Film film);
	List <Rezervacija> findBySala (Sala sala);
	
	
}