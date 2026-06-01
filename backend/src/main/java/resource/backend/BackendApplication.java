package resource.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BackendApplication {

	public static void main(String[] args) {
		// Load .env variables before Spring Boot starts!
		EnvLoader.loadEnvVars();

		SpringApplication.run(BackendApplication.class, args);
	}

}
