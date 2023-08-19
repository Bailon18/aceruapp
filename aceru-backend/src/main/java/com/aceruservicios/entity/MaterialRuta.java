package com.aceruservicios.entity;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "material_ruta")
public class MaterialRuta implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String nombre;
    
    @Column(length = 1000)
    private String descripcion;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "material_id")
    private Material material;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tipo_material_id")
    private MaterialTipo tipoMaterial;
    
    
    @Column
    private String ruta;

    public MaterialRuta() {
        super();
    }

    public MaterialRuta(Long id, Material material, MaterialTipo tipoMaterial, String ruta) {
        super();
        this.id = id;
        this.material = material;
        this.tipoMaterial = tipoMaterial;
        this.ruta = ruta;
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

    public Material getMaterial() {
        return material;
    }

    public void setMaterial(Material material) {
        this.material = material;
    }

    public MaterialTipo getTipoMaterial() {
        return tipoMaterial;
    }

    public void setTipoMaterial(MaterialTipo tipoMaterial) {
        this.tipoMaterial = tipoMaterial;
    }

    public String getRuta() {
        return ruta;
    }

    public void setRuta(String ruta) {
        this.ruta = ruta;
    }

    @Override
    public String toString() {
        StringBuilder builder = new StringBuilder();
        builder.append("MaterialRuta [id=");
        builder.append(id);
        builder.append(", material=");
        builder.append(material);
        builder.append(", tipoMaterial=");
        builder.append(tipoMaterial);
        builder.append(", ruta=");
        builder.append(ruta);
        builder.append("]");
        return builder.toString();
    }
}

