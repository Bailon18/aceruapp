package com.aceruservicios.entity;



import java.io.Serializable;
import java.sql.Time;
import java.util.Date;
import javax.persistence.*;

@Entity
@Table(name = "competencia")

public class Competencia implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 200)
    private String nombre;

    @Column(columnDefinition = "TEXT")
    private String descripcion;


    @Temporal(TemporalType.DATE)
    @Column(name = "fecha_inicio")
    private Date fechaInicio;

    @Column(name = "hora_inicio")
    private Time horaInicio;

    @Temporal(TemporalType.DATE)
    @Column(name = "fecha_final")
    private Date fechaFinal;

    @Column(name = "hora_final")
    private Time horaFinal;

    public Competencia() {
        super();
    }

    public Competencia(Long id, String nombre, String descripcion, Date fechaInicio, Time horaInicio, Date fechaFinal,
                       Time horaFinal) {
        super();
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.fechaInicio = fechaInicio;
        this.horaInicio = horaInicio;
        this.fechaFinal = fechaFinal;
        this.horaFinal = horaFinal;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Date getFechaInicio() {
        return fechaInicio;
    }

    public void setFechaInicio(Date fechaInicio) {
        this.fechaInicio = fechaInicio;
    }

    public Time getHoraInicio() {
        return horaInicio;
    }

    public void setHoraInicio(Time horaInicio) {
        this.horaInicio = horaInicio;
    }

    public Date getFechaFinal() {
        return fechaFinal;
    }

    public void setFechaFinal(Date fechaFinal) {
        this.fechaFinal = fechaFinal;
    }

    public Time getHoraFinal() {
        return horaFinal;
    }

    public void setHoraFinal(Time horaFinal) {
        this.horaFinal = horaFinal;
    }

    public static long getSerialversionuid() {
        return serialVersionUID;
    }

    @Override
    public String toString() {
        StringBuilder builder = new StringBuilder();
        builder.append("Competencia [id=");
        builder.append(id);
        builder.append(", nombre=");
        builder.append(nombre);
        builder.append(", descripcion=");
        builder.append(descripcion);
        builder.append(", fechaInicio=");
        builder.append(fechaInicio);
        builder.append(", horaInicio=");
        builder.append(horaInicio);
        builder.append(", fechaFinal=");
        builder.append(fechaFinal);
        builder.append(", horaFinal=");
        builder.append(horaFinal);
        builder.append("]");
        return builder.toString();
    }

    private static final long serialVersionUID = 1L;
}
