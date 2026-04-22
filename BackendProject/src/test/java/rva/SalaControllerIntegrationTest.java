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

import rva.models.Sala;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
class SalaControllerIntegrationTest {

	RestTemplate template = new RestTemplate();
	String apiUrl = "http://localhost:8080/salas";
	static int largestId = 0; 
	
	@Test
	@Order(1)
	void getAllSalas() {
		ResponseEntity <List<Sala>> response = template.exchange(apiUrl, HttpMethod.GET, null, 
				new ParameterizedTypeReference<List<Sala>>() {});
		
		assertEquals(200, response.getStatusCode().value());
		assertNotEquals(0, response.getBody().size());
		
	}
	
	@Test
	@Order(2)
	void getSalaById() {
		long id=1;
		ResponseEntity<Sala> response = 
				template.getForEntity(apiUrl + "?id=" + id, Sala.class);
		
		assertEquals(200, response.getStatusCode().value());
		assertEquals(id, response.getBody().getId());
		
	}
	
	@Test
	@Order(3)
	void getSalaByKapacitet() {
		int kapacitet = 200;
		ResponseEntity<List<Sala>> response = 
				template.exchange(apiUrl + "?kapacitet=" + kapacitet, HttpMethod.GET, null, 
						new ParameterizedTypeReference<List<Sala>>() {});
		assertEquals(200, response.getStatusCode().value());
		assertNotEquals(0, response.getBody().size());
		
	}
	
	
	@Test
	@Order(4)
	void getSalaByBioskop() {
		int bioskopId = 1; 
		ResponseEntity<List<Sala>> response = 
				template.exchange(apiUrl + "/bioskop?bioskopId=" + bioskopId, HttpMethod.GET, null, 
						new ParameterizedTypeReference<List<Sala>>() {});
		assertEquals(200, response.getStatusCode().value());
		assertNotEquals(0, response.getBody().size());
		for(Sala s: response.getBody()) {
			assertEquals(bioskopId, s.getBioskop().getId());
		}
	}
	
	@Test
	@Order(5)
	void createSala() {
		
		Sala sala = new Sala();
		sala.setBrojRedova(19);
		sala.setKapacitet(209);

		HttpEntity<Sala> entity = new HttpEntity<Sala>(sala);
		
		ResponseEntity<Sala> response = 
				template.exchange(apiUrl, HttpMethod.POST, entity, Sala.class);
		
		assertEquals(201, response.getStatusCode().value());
		assertEquals(sala.getBrojRedova(), response.getBody().getBrojRedova());
		assertEquals(sala.getKapacitet(), response.getBody().getKapacitet());
		
		if(largestId<response.getBody().getId()) largestId = (int) response.getBody().getId();
	}
	
	@Test
	@Order(6)
	void updateSala() {
		Sala sala = new Sala();
		sala.setBrojRedova(22);
		sala.setKapacitet(242);
		
		HttpEntity<Sala> entity = new HttpEntity<Sala>(sala);
		
		ResponseEntity<Sala> response = 
				template.exchange(apiUrl + "?id=" + largestId, HttpMethod.PUT, entity, Sala.class);
		
		assertEquals(200, response.getStatusCode().value());
		assertEquals(sala.getBrojRedova(), response.getBody().getBrojRedova());
		assertEquals(sala.getKapacitet(), response.getBody().getKapacitet());
	}
	
	@Test
	@Order(7)
	void deleteSala() {
		ResponseEntity<?> response = 
				template.exchange(apiUrl + "?id=" + largestId, HttpMethod.DELETE, null, Sala.class);
		
		assertEquals(204, response.getStatusCode().value());
		assertNull(response.getBody());
	}

	

}
