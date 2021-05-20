export interface User{
    _id?: string;
    roles?: string;
    email: string;
    password: string;
    repeatPassword: string;
    name: string;
    fechanto: Date;
    country: string;
    state: string;
    city: string;
    photo?: string;
    createAt?: string | Date;
    updateAt?: string | Date;

}