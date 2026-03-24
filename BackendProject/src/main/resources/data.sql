
insert into bioskop (id, naziv, adresa)
values (nextval('bioskop_seq'),'Cinestar Cinemas','Sentandrejski put 11'),
		(nextval('bioskop_seq'),'Arena Cineplex','Bulevar Mihajla pupina 3'),
		(nextval('bioskop_seq'),'Cineplexx','Bulevar oslobođenja 119'),
		(nextval('bioskop_seq'),'Cine Grad','Patrijarha Dimitrija 14');
		
insert into film (id, naziv, recenzija, trajanje, zanr)
values (nextval('film_seq'), 'Drama', 4, 106, 'Komedija'),
    	(nextval('film_seq'), 'Kontaminacija', 3, 99, 'Triler'),
   		(nextval('film_seq'), 'Projekat ocajnicki prokusaj', 5, 156, 'Naucna fantastika'),
    	(nextval('film_seq'), 'Nirnberg', 4, 148, 'Drama');
		
		
insert into sala (id, kapacitet, broj_redova, bioskop)
values (nextval('sala_seq'), 150, 10, 1), 
	    (nextval('sala_seq'), 200, 15, 1),
	    (nextval('sala_seq'), 120, 8, 2),
	    (nextval('sala_seq'), 80, 5, 3), 
	    (nextval('sala_seq'), 250, 25, 4);
    
insert into rezervacija (id, broj_osoba, cena_karte, datum, placeno, film, sala)
values (nextval('rezervacija_seq'), 2, 1200.00, TO_DATE('26.03.2026','dd.mm.yyyy'), true, 1, 1),
	    (nextval('rezervacija_seq'), 4, 1800.00, TO_DATE('20.04.2026','dd.mm.yyyy'), false, 3, 2),
	    (nextval('rezervacija_seq'), 1, 650.50, TO_DATE('16.04.2026','dd.mm.yyyy'), true, 2, 3),
	    (nextval('rezervacija_seq'), 3, 1500.00, TO_DATE('22.04.2026','dd.mm.yyyy'), true, 4, 5);