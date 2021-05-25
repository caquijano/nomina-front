export interface Nomina {
    _id?: string;
    nombre: string;
    cargo: string;
    salariobase: number;
    diasTrabajados: number;
    basicototal: number;
    auxtransporte: number;
    horasextras: number;
    totaldevengado: number;
    salud: number;
    pension: number;
    parafiscales: number;
    cargas: number;
    seguridad: number;
    fsp: number;
    totaldeducido: number;
    netopagar: number;
    fechaNomina: Date;
    createAt?: string | Date;
    updateAt?: string | Date;
  }