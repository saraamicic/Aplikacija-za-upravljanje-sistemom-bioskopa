package rva.controllers;

import java.net.URI;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import rva.models.Film;
import rva.models.Rezervacija;
import rva.models.Sala;
import rva.services.FilmService;
import rva.services.RezervacijaService;
import rva.services.SalaService;

@CrossOrigin
@RestController
public class RezervacijaController {

	@Autowired
	private RezervacijaService service;
	
	@Autowired
	private FilmService filmService;
	
	@Autowired
	private SalaService salaService;
	
	@GetMapping("/rezervacijas")
	public ResponseEntity <?> getRezervacijas(@RequestParam (required = false) Boolean placeno, @RequestParam (required = false) Long id){
		
		if(placeno != null && id == null) 
		{
			List <Rezervacija> rezervacijas = service.getRezervacijaByPlaceno(placeno);
			if (rezervacijas.isEmpty()) 
				return ResponseEntity.status(HttpStatus.NOT_FOUND)
						.body(String.format("No rezervacijas found found for placeno: %s", placeno));
			
			return ResponseEntity.ok(rezervacijas);
			
		}else if(placeno == null && id != null) { 
			Optional<Rezervacija> rezervacija =  service.findById(id);
			
			if(rezervacija.isEmpty())
				return ResponseEntity.status(HttpStatus.NOT_FOUND)
						.body(String.format("No rezervacijas found with ID: %s", id));
			
			return ResponseEntity.ok(rezervacija.get());
			
			
		}else if (placeno != null && id != null) { 
			return ResponseEntity.badRequest().body("Request can only accept either ID or Placeno");
		}
		return ResponseEntity.ok(service.getAll()); 
	}
	
	
	//za strani kljuc
	@GetMapping("/rezervacijas/film")
	public ResponseEntity<?> getRezervacijaByFilm(@RequestParam Long filmId){
		Optional<Film> film = filmService.findById(filmId);
		if(film.isEmpty()) {
			return ResponseEntity.status(404).body(String.format("Film with an ID: %s does not exist", filmId));
		}
		List<Rezervacija> rezervacije = service.getRezervacijaByFilm(film.get());
		if(rezervacije.isEmpty()) {
			return ResponseEntity.status(404).body(String.format("Rezervacija with film ID: %s does not exist", filmId));
		}
		return ResponseEntity.ok(rezervacije);
	}
	
	@GetMapping("/rezervacijas/sala")
	public ResponseEntity<?> getRezervacijaBySala(@RequestParam Long salaId){
		Optional<Sala> sala = salaService.findById(salaId);
		if(sala.isEmpty()) {
			return ResponseEntity.status(404).body(String.format("Sala with an ID: %s does not exist", salaId));
		}
		List<Rezervacija> rezervacije = service.getRezervacijaBySala(sala.get());
		if(rezervacije.isEmpty()) {
			return ResponseEntity.status(404).body(String.format("Rezervacija with sala ID: %s does not exist", salaId));
		}
		return ResponseEntity.ok(rezervacije);
	}
	
	
	@PostMapping ("/rezervacijas")
	public ResponseEntity<?> createRezervacija(@RequestBody Rezervacija rezervacija)
	{
		Rezervacija createdRezervacija = service.create(rezervacija);
		URI uri = URI.create(String.format("/rezervacijas?id=%s", createdRezervacija.getId()));
		return ResponseEntity.created(uri).body(createdRezervacija);
	}
	
	@PutMapping("/rezervacijas")
	public ResponseEntity<?> updateRezervacija(@RequestBody Rezervacija rezervacija, @RequestParam Long id)
	{
		Optional<Rezervacija> updatedRezervacija = service.update(rezervacija, id);
		if(updatedRezervacija.isEmpty())
			return ResponseEntity.status(404).body(String.format("Resource with an ID: %s does not exist", id));
		return ResponseEntity.ok(updatedRezervacija.get());
	}
	
	@DeleteMapping("/rezervacijas")
	public ResponseEntity<?> deleteRezervacija(@RequestParam Long id)
	{
		if(service.existsById(id) && id!=null)
		{
			service.delete(id);
			return ResponseEntity.status(204).body(null);
		}
		return ResponseEntity.status(404).body(String.format("Resource with an ID: %s does not exist", id));
	}
	
}
