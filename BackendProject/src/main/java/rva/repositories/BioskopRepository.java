package rva.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import rva.models.Bioskop;

//jpa repository sadrzi neke metode koje rade nad bazom, on pretvori neke metode u upite nad bazom podataka
//tip entiteta i primarnog kljuca

//trebaju nam metode da pretrazimo po nekom obelezju i po stranim kljucevima, a jpa vec ima neke svoje metode
@Repository
public interface BioskopRepository extends JpaRepository<Bioskop, Long> {

	List<Bioskop> findByNazivLike (String naziv);
}
