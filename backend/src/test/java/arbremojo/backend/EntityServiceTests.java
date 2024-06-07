import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

import arbremojo.backend.controller.*;
import arbremojo.backend.service.*;
import jakarta.persistence.EntityNotFoundException;

class EntityServiceTest {

    @Mock
    private JpaRepository<Object, Integer> repository;

    private EntityService<Object, JpaRepository<Object, Integer>> entityService;

    @BeforeEach
    void setup() {
        MockitoAnnotations.openMocks(this);
        entityService = new EntityService<>(repository) {
            @Override
            public Integer deleteEntityById(Integer id) {
                repository.deleteById(id);
                return id;
            }
        };
    }

    @Test
    @DisplayName("Add entity successfully")
    void addEntitySuccessfully() {
        Object entity = new Object();
        when(repository.save(entity)).thenReturn(entity);

        Object result = entityService.addEntity(entity);

        assertEquals(entity, result);
        verify(repository, times(1)).save(entity);
    }

    @Test
    @DisplayName("Find all entities successfully")
    void findAllEntitiesSuccessfully() {
        List<Object> entities = Arrays.asList(new Object(), new Object());
        when(repository.findAll()).thenReturn(entities);

        List<Object> result = entityService.findAllEntities();

        assertEquals(entities, result);
        verify(repository, times(1)).findAll();
    }

    @Test
    @DisplayName("Find entity by id successfully")
    void findEntityByIdSuccessfully() {
        Object entity = new Object();
        when(repository.findById(1)).thenReturn(Optional.of(entity));

        Object result = entityService.findEntityById(1);

        assertEquals(entity, result);
        verify(repository, times(1)).findById(1);
    }

    @Test
    @DisplayName("Find entity by id throws exception when entity not found")
    void findEntityByIdThrowsExceptionWhenEntityNotFound() {
        when(repository.findById(1)).thenReturn(Optional.empty());

        assertThrows(EntityNotFoundException.class, () -> entityService.findEntityById(1));

        verify(repository, times(1)).findById(1);
    }

    @Test
    @DisplayName("Update entity successfully")
    void updateEntitySuccessfully() {
        Object entity = new Object();
        when(repository.save(entity)).thenReturn(entity);

        Object result = entityService.updateEntity(entity);

        assertEquals(entity, result);
        verify(repository, times(1)).save(entity);
    }

    @Test
    @DisplayName("Delete entity by id successfully")
    void deleteEntityByIdSuccessfully() {
        Integer id = entityService.deleteEntityById(1);

        assertEquals(1, id);
        verify(repository, times(1)).deleteById(1);
    }
}