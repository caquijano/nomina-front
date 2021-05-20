export interface Empleado{
    _id?: string;
    nombre: string;
    apellidos: string;
    telefono: string;
    direccion: string;
    fechaNto: string | Date;
    cargo: string;
    salario?: number;
    fechaEntrada:string | Date; 
    cesantias?: number;
    vacaciones?:number;
    prima?:number;
    createAt?: string | Date;
    updateAt?: string | Date;

}