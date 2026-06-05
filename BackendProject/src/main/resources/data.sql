
insert into bioskop (id, naziv, adresa)
values (nextval('bioskop_seq'),'CineStar Cinemas','Sentandrejski put 11, Novi Sad'),
		(nextval('bioskop_seq'),'Arena Cineplex','Bulevar Mihajla pupina 3, Novi Sad'),
		(nextval('bioskop_seq'),'Cineplexx Novi Sad','Bulevar oslobođenja 119, Novi Sad'),
		(nextval('bioskop_seq'),'Cine Grad','Patrijarha Dimitrija 14, Beograd'),
		(nextval('bioskop_seq'), 'Cineplexx Galerija', 'Bulevar Vudro Vilson 12, Beograd'),
		(nextval('bioskop_seq'), 'CineStar 4XD', 'Radnička 9, Niš'),
		(nextval('bioskop_seq'), 'KC Bioskop', 'Katolička porta 5, Novi Sad');
		
insert into film (id, naziv, recenzija, trajanje, zanr)
values (nextval('film_seq'), 'Drama', 4.0, 106, 'Komedija'),
    	(nextval('film_seq'), 'Kontaminacija', 3.7, 99, 'Triler'),
   		(nextval('film_seq'), 'Projekat očajnicki prokušaj', 4.9, 156, 'Naučna fantastika'),
    	(nextval('film_seq'), 'Orkanski visovi', 4.1, 148, 'Romantični'),
    	(nextval('film_seq'), 'Barbie', 4.8, 114, 'Komedija'),
    	(nextval('film_seq'), 'Grešnici', 4.7, 137, 'Akcija'),
   		(nextval('film_seq'), 'F1', 3.9, 155, 'Akcija'),
    	(nextval('film_seq'), 'Openhajmer', 5.0, 180, 'Triler'),
    	(nextval('film_seq'), 'Opasne devojke', 4.5, 97, 'Komedija'),
   		(nextval('film_seq'), 'Legalna plavuša', 4.2, 96, 'Komedija'),
    	(nextval('film_seq'), 'Kum', 5.0, 175, 'Kriminalistički'),
    	(nextval('film_seq'), 'Prokletnici', 4.5, 153, 'Ratni');
		
		
insert into sala (id, kapacitet, broj_redova, bioskop)
values (nextval('sala_seq'), 100, 10, 1), 
	    (nextval('sala_seq'), 140, 15, 1),
	    (nextval('sala_seq'), 120, 8, 2),
	    (nextval('sala_seq'), 85, 7, 2), 
	    (nextval('sala_seq'), 250, 27, 3),
	    (nextval('sala_seq'), 150, 12, 4), 
	    (nextval('sala_seq'), 240, 21, 4),
	    (nextval('sala_seq'), 170, 14, 7),
	    (nextval('sala_seq'), 60, 5, 7), 
	    (nextval('sala_seq'), 110, 18, 5);
    
insert into rezervacija (id, broj_osoba, cena_karte, datum, placeno, film, sala)
values (nextval('rezervacija_seq'), 2, 400.00, TO_DATE('30.06.2026','dd.mm.yyyy'), true, 1, 1),
	    (nextval('rezervacija_seq'), 4, 350.00, TO_DATE('27.05.2026','dd.mm.yyyy'), false, 3, 2),
	    (nextval('rezervacija_seq'), 1, 650.50, TO_DATE('16.08.2026','dd.mm.yyyy'), true, 4, 3),
	    (nextval('rezervacija_seq'), 3, 700.00, TO_DATE('22.08.2026','dd.mm.yyyy'), false, 4, 5),
	    (nextval('rezervacija_seq'), 2, 280.00, TO_DATE('14.07.2026','dd.mm.yyyy'), false, 3, 1),
	    (nextval('rezervacija_seq'), 5, 330.00, TO_DATE('05.06.2026','dd.mm.yyyy'), false, 8, 1),
	    (nextval('rezervacija_seq'), 7, 410.50, TO_DATE('10.08.2026','dd.mm.yyyy'), true, 7, 7),
	    (nextval('rezervacija_seq'), 3, 400.00, TO_DATE('03.07.2026','dd.mm.yyyy'), false, 8, 7),
	    (nextval('rezervacija_seq'), 2, 530.00, TO_DATE('27.06.2026','dd.mm.yyyy'), true, 10, 8),
	    (nextval('rezervacija_seq'), 10, 440.00, TO_DATE('09.06.2026','dd.mm.yyyy'), false, 2, 8),
	    (nextval('rezervacija_seq'), 8, 410.50, TO_DATE('16.07.2026','dd.mm.yyyy'), true, 8, 10),
	    (nextval('rezervacija_seq'), 5, 390.00, TO_DATE('15.07.2026','dd.mm.yyyy'), false, 5, 10);