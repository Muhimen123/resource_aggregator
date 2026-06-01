package resource.backend;

import io.github.cdimascio.dotenv.Dotenv;

public class EnvLoader {

    public static void loadEnvVars() {
        Dotenv dotenv = Dotenv.configure()
                .filename(".env")
                .ignoreIfMissing()
                .load();

        if (dotenv.get("DB_URL") != null) {
            System.setProperty("DB_URL", dotenv.get("DB_URL"));
            System.setProperty("DB_USERNAME", dotenv.get("DB_USERNAME"));
            System.setProperty("DB_PASSWORD", dotenv.get("DB_PASSWORD"));
        }
    }
}