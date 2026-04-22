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
import rva.models.Film;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
class FilmControllerIntegrationTest {

	RestTemplate template = new RestTemplate();
	String apiUrl = "http://localhost:8080/films";
	static int largestId = 0; 
	
	@Test
	@Order(1)
	void getAllFilms() {
		ResponseEntity <List<Film>> response = template.exchange(apiUrl, HttpMethod.GET, null, 
				new ParameterizedTypeReference<List<Film>>() {});
		
		assertEquals(200, response.getStatusCode().value());
		assertNotEquals(0, response.getBody().size());
	}

	@Test
	@Order(2)
	void getFilmById() {
		long id=1;
		ResponseEntity<Film> response = 
				template.getForEntity(apiUrl + "?id=" + id, Film.class);
		
		assertEquals(200, response.getStatusCode().value());
		assertEquals(id, response.getBody().getId());
		
	}
	
	@Test
	@Order(3)
	void getFilmByNaziv() {
		String naziv = "Drama";
		ResponseEntity<List<Film>> response = 
				template.exchange(apiUrl + "?naziv=" + naziv, HttpMethod.GET, null, 
						new ParameterizedTypeReference<List<Film>>() {});
		assertEquals(200, response.getStatusCode().value());
		assertNotEquals(0, response.getBody().size());
		
	}
	
	
	@Test
	@Order(4)
	void createFilm() {
		
		Film film = new Film();
		film.setNaziv("Naziv filma");
		film.setTrajanje(160);

		HttpEntity<Film> entity = new HttpEntity<Film>(film);
		
		ResponseEntity<Film> response = 
				template.exchange(apiUrl, HttpMethod.POST, entity, Film.class);
		
		assertEquals(201, response.getStatusCode().value());
		assertEquals(film.getNaziv(), response.getBody().getNaziv());
		assertEquals(film.getTrajanje(), response.getBody().getTrajanje());
		
		if(largestId<response.getBody().getId()) largestId = (int) response.getBody().getId();
	}
	
	@Test
	@Order(5)
	void updateFilm() {
		
		Film film = new Film();
		film.setNaziv("Izmenjen naziv");
		film.setTrajanje(210);
		
		HttpEntity<Film> entity = new HttpEntity<Film>(film);
		
		ResponseEntity<Film> response = 
				template.exchange(apiUrl + "?id=" + largestId, HttpMethod.PUT, entity, Film.class);
		
		assertEquals(200, response.getStatusCode().value());
		assertEquals(film.getNaziv(), response.getBody().getNaziv());
		assertEquals(film.getTrajanje(), response.getBody().getTrajanje());
	}
	
	@Test
	@Order(6)
	void deleteFilm() {
		ResponseEntity<?> response = 
				template.exchange(apiUrl + "?id=" + largestId, HttpMethod.DELETE, null, Bioskop.class);
		
		assertEquals(204, response.getStatusCode().value());
		assertNull(response.getBody());
	}
	
}
