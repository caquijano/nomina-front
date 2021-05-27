export interface HExtra{
    _id?: string;
    idEmpleado: string;
    nombreEmpleado:string;
    hed: number;
    hen: number;
    valor: number;
    fechaNovedad: string | Date;
    createAt?: string | Date;
    updateAt?: string | Date;
}