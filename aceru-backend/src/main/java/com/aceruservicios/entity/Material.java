package com.aceruservicios.entity;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

import com.aceruservicios.enums.TipoMaterial;


import java.io.Serializable;

@Entity
@Table(name = "material")
public class Material implements Serializable {

	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String nombre;

	@Column(columnDefinition = "TEXT")
	private String descripcion;


	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "material_id")
	private MaterialCategoria materialCategoria;

	/*
	 * @ManyToOne(fetch = FetchType.LAZY)
	 * 
	 * @JoinColumn(name = "tipo_material_id") private MaterialTipo tipoMaterial;
	 */

	@NotNull
	@Enumerated(EnumType.STRING)
	private TipoMaterial tipoMaterial;

	@Column
	private String ruta;

	public Material() {
		super();
	}

	public Material(Long id, String nombre, String descripcion, MaterialCategoria materialCategoria,
			@NotNull TipoMaterial tipoMaterial, String ruta) {
		super();
		this.id = id;
		this.nombre = nombre;
		this.descripcion = descripcion;
		this.materialCategoria = materialCategoria;
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

	public MaterialCategoria getMaterial() {
		return materialCategoria;
	}

	public void setMaterial(MaterialCategoria materialCategoria) {
		this.materialCategoria = materialCategoria;
	}

	public TipoMaterial getTipoMaterial() {
		return tipoMaterial;
	}

	public void setTipoMaterial(TipoMaterial tipoMaterial) {
		this.tipoMaterial = tipoMaterial;
	}

	public String getRuta() {
		return ruta;
	}

	public void setRuta(String ruta) {
		this.ruta = ruta;
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

	public MaterialCategoria getMaterialCategoria() {
		return materialCategoria;
	}

	public void setMaterialCategoria(MaterialCategoria materialCategoria) {
		this.materialCategoria = materialCategoria;
	}

	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("Material [id=");
		builder.append(id);
		builder.append(", materialCategoria=");
		builder.append(materialCategoria);
		builder.append(", tipoMaterial=");
		builder.append(tipoMaterial);
		builder.append(", ruta=");
		builder.append(ruta);
		builder.append("]");
		return builder.toString();
	}
}

