package com.devweb.venuer;

import com.devweb.venuer.model.Categoria;
import com.devweb.venuer.model.Local;
import com.devweb.venuer.model.Usuario;
import com.devweb.venuer.repository.CategoriaRepository;
import com.devweb.venuer.repository.LocalRepository;
import com.devweb.venuer.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Optional;

@SpringBootApplication
public class VenuerApplication implements CommandLineRunner {

	@Autowired
	private final LocalRepository localRepository;
	@Autowired
	private final CategoriaRepository categoriaRepository;
	private final UsuarioRepository usuarioRepository;

	public VenuerApplication(LocalRepository localRepository,
							 CategoriaRepository categoriaRepository,
							 UsuarioRepository usuarioRepository) {
		this.localRepository = localRepository;
		this.categoriaRepository = categoriaRepository;
		this.usuarioRepository = usuarioRepository;
	}

//	@Autowired
//	private LocalRepository localRepository;

	public static void main(String[] args) {

		SpringApplication.run(VenuerApplication.class, args);
	}

	private void createTables() {
		Usuario usuario = new Usuario("anan", "ana","beatriz", "ana@mail.com", "21997611494", "12345");
		usuarioRepository.save(usuario);

		Categoria salao = categoriaRepository.findByNome("Salão")
				.orElseGet(() -> categoriaRepository.save(new Categoria("Salão")));
		Categoria sala = categoriaRepository.findByNome("Sala")
				.orElseGet(() -> categoriaRepository.save(new Categoria("Sala")));
		Categoria estudio = categoriaRepository.findByNome("Estúdio")
				.orElseGet(() -> categoriaRepository.save(new Categoria("Estúdio")));

			Local local = new Local(
					"ballroom.png",
					"Local 1",
					"Descrição do Local 1",
					true,
					10,
					50,
					2,
					1,
					BigDecimal.valueOf(500.00),
					BigDecimal.valueOf(50.00),
					BigDecimal.valueOf(10.00),
					"Endereço 1",
					"Cidade 1",
					"Estado 1",
					"12345-678",
					LocalDate.now(),
					salao,
					usuario);
			localRepository.save(local);

			local = new Local(
					"office.png",
					"Local 2",
					"Descrição do Local 2",
					true,
					20,
					100,
					4,
					2,
					BigDecimal.valueOf(1000.00),
					BigDecimal.valueOf(100.00),
					BigDecimal.valueOf(20.00),
					"Endereço 2",
					"Cidade 2",
					"Estado 2",
					"23456-789",
					LocalDate.now(),
					sala,
					usuario);
			localRepository.save(local);

			local = new Local(
					"studio.png",
					"Local 3",
					"Descrição do Local 3",
					true,
					15,
					75,
					3,
					1,
					BigDecimal.valueOf(750.00),
					BigDecimal.valueOf(75.00),
					BigDecimal.valueOf(15.00),
					"Endereço 3",
					"Cidade 3",
					"Estado 3",
					"34567-890",
					LocalDate.now(),
					estudio,
					usuario);
			localRepository.save(local);

			local = new Local(
					"ballroom.png",
					"Local 4",
					"Descrição do Local 4",
					true,
					25,
					125,
					5,
					3,
					BigDecimal.valueOf(1250.00),
					BigDecimal.valueOf(125.00),
					BigDecimal.valueOf(25.00),
					"Endereço 4",
					"Cidade 4",
					"Estado 4",
					"45678-901",
					LocalDate.now(),
					salao,
					usuario);
			localRepository.save(local);
	}

	@Override
	public void run(String... args) throws Exception {
//		createTables();
	}
}
