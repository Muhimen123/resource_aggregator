package resource.backend;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class BackendApplicationTests {

	@BeforeAll
	static void loadEnvVars() {
		// Centralized loading to avoid duplicate code!
		EnvLoader.loadEnvVars();
	}

	@Test
	void contextLoads() {
	}

}
