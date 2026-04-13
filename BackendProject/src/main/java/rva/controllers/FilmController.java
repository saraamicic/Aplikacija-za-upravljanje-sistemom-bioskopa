package rva.controllers;

import java.net.URI;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import rva.models.Film;
import rva.services.FilmService;

@RestController
public class FilmController {

	@Autowired
	private FilmService service;
	
	@GetMapping("/films")
	public ResponseEntity <?> getFilms(@RequestParam (required = false) String naziv, @RequestParam (required = false) Long id){
		
		if(naziv != null && id == null) //prosledjen samo naziv
		{
			List <Film> films = service.getFilmByNaziv(naziv);
			if (films.isEmpty()) 
				return ResponseEntity.status(HttpStatus.NOT_FOUND)
						.body(String.format("No films found for naziv: %s", naziv));
			
			return ResponseEntity.ok(films);
			
		}else if(naziv == null && id != null) { //prosledjen id nije naziv
			Optional<Film> film =  service.findById(id);
			
			if(film.isEmpty())
				return ResponseEntity.status(HttpStatus.NOT_FOUND)
						.body(String.format("No film found with ID: %s", id));
			
			return ResponseEntity.ok(film.get());
			
			
		}else if (naziv != null && id != null) { //imamo i naziv i id
			return ResponseEntity.badRequest().body("Request can only accept either ID or Naziv");
		}
		
		return ResponseEntity.ok(service.getAll()); //vratimo sve
	}
	
	@PostMapping ("/films")
	public ResponseEntity<?> createFilm(@RequestBody Film film)
	{
		Film createdFilm = service.create(film);
		URI uri = URI.create(String.format("/films?id=%s", createdFilm.getId()));
		return ResponseEntity.created(uri).body(createdFilm);
	}
	
	@PutMapping("/films")
	public ResponseEntity<?> updateFilm(@RequestBody Film film, @RequestParam Long id)
	{
		Optional<Film> updatedFilm = service.update(film, id);
		if(updatedFilm.isEmpty())
			return ResponseEntity.status(404).body(String.format("Resource with an ID: %s does not exist", id));
		return ResponseEntity.ok(updatedFilm.get());
	}
	
	@DeleteMapping("/films")
	public ResponseEntity<?> deleteFilm(@RequestParam Long id)
	{
		if(service.existsById(id) && id!=null)
		{
			service.delete(id);
			return ResponseEntity.status(204).body(null);
		}
		return ResponseEntity.status(404).body(String.format("Resource with an ID: %s does not exist", id));
		
		
	}
	
	
	
}
