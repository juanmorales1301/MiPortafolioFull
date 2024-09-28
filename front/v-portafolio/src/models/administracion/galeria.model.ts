export interface Album {
    id: string;
    nombre: string;
    descripcion?: string;
    usuario_id: string;
    numero_imagenes: number;
    estado: string;
  }
  
  export interface Imagen {
    id: string;
    album_id: string;
    url: string;
    titulo?: string;
    descripcion?: string;
    estado: string;
  }
  