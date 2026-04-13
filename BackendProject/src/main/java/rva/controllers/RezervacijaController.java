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

import rva.models.Rezervacija;
import rva.services.RezervacijaService;

@RestController
public class RezervacijaController {

	@Autowired
	private RezervacijaService service;
	
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
