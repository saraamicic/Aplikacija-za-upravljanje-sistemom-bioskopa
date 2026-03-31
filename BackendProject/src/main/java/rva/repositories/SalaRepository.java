package rva.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import rva.models.Bioskop;
import rva.models.Sala;

@Repository
public interface SalaRepository extends JpaRepository<Sala, Long> {

	List<Sala> findByKapacitetLessThan (int kapacitet);
	List<Sala> findByBioskop (Bioskop bioskop);
}
