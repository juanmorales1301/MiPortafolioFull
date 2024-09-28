export interface albumModel {
  _id?: string,
  nombre: string;
  descripcion: string;
  usuario_id: number;
  numero_imagenes: number;
  estado: string;
}

export interface imagenModel {
  _id?: string,
  titulo: string;
  descripcion: string;
  url: string;
  album_id: string;
  estado: string;
  subido_en?: Date;
  modificado_en?: Date;
  modificado_por?: string;
}