package rva;

import static org.junit.jupiter.api.Assertions.*;

import java.util.List;

import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import rva.models.Bioskop;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
class BioskopControllerIntegrationTest {

	RestTemplate template = new RestTemplate();
	String apiUrl = "http://localhost:8080/bioskops";
	static int largestId = 0; 
	
	@Test
	@Order(1)
	void getAllBioskops() {
		ResponseEntity <List<Bioskop>> response = template.exchange(apiUrl, HttpMethod.GET, null, 
				new ParameterizedTypeReference<List<Bioskop>>() {});
		
		assertEquals(200, response.getStatusCode().value());
		assertNotEquals(0, response.getBody().size());
	}

	@Test
	@Order(2)
	void getBioskopById() {
		long id=1;
		ResponseEntity<Bioskop> response = 
				template.getForEntity(apiUrl + "?id=" + id, Bioskop.class);
		
		assertEquals(200, response.getStatusCode().value());
		assertEquals(id, response.getBody().getId());
		
	}
	
	@Test
	@Order(3)
	void getBioskopByNaziv() {
		String naziv = "Cinestar Cinemas";
		ResponseEntity<List<Bioskop>> response = 
				template.exchange(apiUrl + "?naziv=" + naziv, HttpMethod.GET, null, 
						new ParameterizedTypeReference<List<Bioskop>>() {});
		assertEquals(200, response.getStatusCode().value());
		assertNotEquals(0, response.getBody().size());
		
	}
	
	
	@Test
	@Order(4)
	void createBioskop() {
		
		Bioskop bioskop = new Bioskop();
		bioskop.setNaziv("Naziv bioskopa");
		bioskop.setAdresa("Adresa bioskopa");

		HttpEntity<Bioskop> entity = new HttpEntity<Bioskop>(bioskop);
		
		ResponseEntity<Bioskop> response = 
				template.exchange(apiUrl, HttpMethod.POST, entity, Bioskop.class);
		
		assertEquals(201, response.getStatusCode().value());
		assertEquals(bioskop.getNaziv(), response.getBody().getNaziv());
		assertEquals(bioskop.getAdresa(), response.getBody().getAdresa());
		
		if(largestId<response.getBody().getId()) largestId = (int) response.getBody().getId();
	}
	
	@Test
	@Order(5)
	void updateBioskop() {
		
		Bioskop bioskop = new Bioskop();
		bioskop.setNaziv("Naziv bioskopa123");
		bioskop.setAdresa("Adresa bioskopa123");
		
		HttpEntity<Bioskop> entity = new HttpEntity<Bioskop>(bioskop);
		
		ResponseEntity<Bioskop> response = 
				template.exchange(apiUrl + "?id=" + largestId, HttpMethod.PUT, entity, Bioskop.class);
		
		assertEquals(200, response.getStatusCode().value());
		assertEquals(bioskop.getNaziv(), response.getBody().getNaziv());
		assertEquals(bioskop.getAdresa(), response.getBody().getAdresa());
	}
	
	@Test
	@Order(6)
	void deleteBioskop() {
		ResponseEntity<?> response = 
				template.exchange(apiUrl + "?id=" + largestId, HttpMethod.DELETE, null, Bioskop.class);
		
		assertEquals(204, response.getStatusCode().value());
		assertNull(response.getBody());
	}
	
}
