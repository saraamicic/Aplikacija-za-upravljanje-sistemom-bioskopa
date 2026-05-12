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

import rva.models.Bioskop;
import rva.services.BioskopService;

//deo bekenda zaduzen za komunikaciju, api deo bekenda. Prihvataju razlicite zahteve i vracaju odgovore.
//moze da komunicira sa frontom i sa drugim app ako to zelimo
//u klasi kontrolera su najcesce samo metode (nemamo obelezja i konstruktore), metode kontrolera se izvrsavaju kada
//pristize zahtev, kontroleri prihvataju http zahteve. Svaki zahtev ide ka odredjenom resursu ili endpointu pa se
//na osnovu toga odredjuje koja metoda se izvrsava

@CrossOrigin
@RestController
public class BioskopController {

	//kada dobijemo zahtev zelimo da se izvrsi neka logika (logiku izvrsavaju servisi)
	
	@Autowired
	private BioskopService service; //ovo je interfejs (dependancy injection)
	
	//ResponseEntity je klasa koja modeluje http odgovor
	
	@GetMapping("/bioskops")
	public ResponseEntity <?> getBioskops(@RequestParam (required = false) String naziv, @RequestParam (required = false) Long id){
		
		if(naziv != null && id == null) //prosledjen samo naziv
		{
			List <Bioskop> bioskops = service.getBioskopByNaziv(naziv);
			if (bioskops.isEmpty()) 
				return ResponseEntity.status(HttpStatus.NOT_FOUND)
						.body(String.format("No bioskops found for naziv: %s", naziv));
			
			return ResponseEntity.ok(bioskops);
			
		}else if(naziv == null && id != null) { //prosledjen id nije naziv
			Optional<Bioskop> bioskop =  service.findById(id);
			
			if(bioskop.isEmpty())
				return ResponseEntity.status(HttpStatus.NOT_FOUND)
						.body(String.format("No bioskops found with ID: %s", id));
			
			return ResponseEntity.ok(bioskop.get());
			
			
		}else if (naziv != null && id != null) { //imamo i naziv i id
			return ResponseEntity.badRequest().body("Request can only accept either ID or Naziv");
		}
		
		return ResponseEntity.ok(service.getAll()); //vratimo sve
	}
	
	@PostMapping ("/bioskops")
	public ResponseEntity<?> createBioskop(@RequestBody Bioskop bioskop)
	{
		Bioskop createdBioskop =  service.create(bioskop);
		URI uri = URI.create(String.format("/bioskops?id=%s", createdBioskop.getId()));
		return ResponseEntity.created(uri).body(createdBioskop);
	}
	
	@PutMapping("/bioskops")
	public ResponseEntity<?> updateBioskop(@RequestBody Bioskop bioskop, @RequestParam Long id)
	{
		Optional<Bioskop> updatedBioskop = service.update(bioskop, id);
		if(updatedBioskop.isEmpty())
			return ResponseEntity.status(404).body(String.format("Resource with an ID: %s does not exist", id));
		return ResponseEntity.ok(updatedBioskop.get());
	}
	
	@DeleteMapping("/bioskops")
	public ResponseEntity<?> deleteBioskop(@RequestParam Long id)
	{
		if(service.existsById(id) && id!=null)
		{
			service.delete(id);
			return ResponseEntity.status(204).body(null);
		}
		return ResponseEntity.status(404).body(String.format("Resource with an ID: %s does not exist", id));
		
	}
		


}
