package rva.services;

import java.util.List;
import java.util.Optional;

//servisi se prave kako bismo imali poslovnu logiku, ovde su to crud operacije, 
//<T> znaci da je nekog tipa, to je neka promenljiva, daje nam visok stepen fleksibilnosti 
public interface CrudService<T>{

	List <T> getAll();
	boolean existsById(long id);
	Optional <T> findById(long id);
	T create (T body);
	Optional <T> update (T body, long id);
	void delete (long id);
	
}
