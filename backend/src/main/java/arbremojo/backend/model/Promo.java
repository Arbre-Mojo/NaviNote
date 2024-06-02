package arbremojo.backend.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "promo")
@Setter
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class Promo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "promo_id", nullable = false)
    private Integer promoId;

    @Column(name = "promo_name", nullable = false)
    private String promoName;
}
