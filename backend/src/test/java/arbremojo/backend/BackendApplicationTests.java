import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import java.util.List;

import arbremojo.backend.controller.*;
import arbremojo.backend.model.*;
import arbremojo.backend.service.*;
import arbremojo.backend.BackendApplication;

class BackendApplicationTest {

    @Mock
    private BackendApplication backendApplication;

    @BeforeEach
    void setup() {
        MockitoAnnotations.openMocks(this);
        backendApplication = new BackendApplication();
    }

    @Test
    @DisplayName("Cors filter configuration is correct")
    void corsFilterConfigurationIsCorrect() {
        CorsFilter corsFilter = backendApplication.corsFilter();
        assertNotNull(corsFilter);
    }
}