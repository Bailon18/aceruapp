
export class Categoria {

    id?: number;
    nombre?: string;
    descripcion?: string;
    imagen?: null;

    constructor(nombre: string, descripcion: string, imagen: null) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.imagen = imagen;
    }

}
