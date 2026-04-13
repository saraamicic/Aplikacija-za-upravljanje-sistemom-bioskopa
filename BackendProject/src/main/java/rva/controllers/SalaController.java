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

import rva.models.Sala;
import rva.services.SalaService;

@RestController
public class SalaController {

	@Autowired
	private SalaService service;
	
	@GetMapping("/salas")
	public ResponseEntity <?> getSalas(@RequestParam (required = false) Integer kapacitet, @RequestParam (required = false) Long id){
		
		if(kapacitet != null && id == null) 
		{
			List <Sala> salas = service.getSalaByKapacitet(kapacitet);
			if (salas.isEmpty()) 
				return ResponseEntity.status(HttpStatus.NOT_FOUND)
						.body(String.format("No salas found for kapacitet: %s", kapacitet));
			
			return ResponseEntity.ok(salas);
			
		}else if(kapacitet == null && id != null) { 
			Optional<Sala> sala =  service.findById(id);
			
			if(sala.isEmpty())
				return ResponseEntity.status(HttpStatus.NOT_FOUND)
						.body(String.format("No salas found with ID: %s", id));
			
			return ResponseEntity.ok(sala.get());
			
			
		}else if (kapacitet != null && id != null) { 
			return ResponseEntity.badRequest().body("Request can only accept either ID or Kapacitet");
		}
		
		return ResponseEntity.ok(service.getAll()); 
	}
	
	@PostMapping ("/salas")
	public ResponseEntity<?> createSala(@RequestBody Sala sala)
	{
		Sala createdSala = service.create(sala);
		URI uri = URI.create(String.format("/salas?id=%s", createdSala.getId()));
		return ResponseEntity.created(uri).body(createdSala);
	}
	
	@PutMapping("/salas")
	public ResponseEntity<?> updateSala(@RequestBody Sala sala, @RequestParam Long id)
	{
		Optional<Sala> updatedSala = service.update(sala, id);
		if(updatedSala.isEmpty())
			return ResponseEntity.status(404).body(String.format("Resource with an ID: %s does not exist", id));
		return ResponseEntity.ok(updatedSala.get());
	}
	
	@DeleteMapping("/salas")
	public ResponseEntity<?> deleteSala(@RequestParam Long id)
	{
		if(service.existsById(id) && id!=null)
		{
			service.delete(id);
			return ResponseEntity.status(204).body(null);
		}
		return ResponseEntity.status(404).body(String.format("Resource with an ID: %s does not exist", id));
		
		
	}
	
}
