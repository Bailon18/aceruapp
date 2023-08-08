package com.aceruservicios.entity;


import javax.persistence.*;
import java.io.Serializable;
import java.util.Arrays;

@Entity
@Table(name = "material")

public class Material implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, length = 200)
    private String nombre;
    @Lob
    @Column
    private byte[] imagen;
    @Column(length = 50, columnDefinition = "VARCHAR(50) DEFAULT 'Activo'")
    private String estado;

    public Material() {
        super();
    }


    public Material(Long id, String nombre, byte[] imagen, String estado) {
        super();
        this.id = id;
        this.nombre = nombre;
        this.imagen = imagen;
        this.estado = estado;
    }

    public static long getSerialversionuid() {
        return serialVersionUID;
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

    public byte[] getImagen() {
        return imagen;
    }

    public void setImagen(byte[] imagen) {
        this.imagen = imagen;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    @Override
    public String toString() {
        StringBuilder builder = new StringBuilder();
        builder.append("Material [id=");
        builder.append(id);
        builder.append(", nombre=");
        builder.append(nombre);
        builder.append(", imagen=");
        builder.append(Arrays.toString(imagen));
        builder.append(", estado=");
        builder.append(estado);
        builder.append("]");
        return builder.toString();
    }
}

