import axios from "axios";
import { Empleado } from "./Empleado";
import config from '../../config'

const API = config.API_HOST

export const createEmpleado = async (empleado:Empleado , token:string) => {
    return await axios.post(`${API}/empleados/${token}`, empleado)
}
export const getEmpleados = async () => {
    return await axios.get(`${API}/empleados`)
}
export const getEmpleado = async (id: string) => {
    return await axios.get<Empleado>(`${API}/empleados/${id}`)
}
export const updateEmpleado = async (id: string, empleado:Empleado, token:string) => {
    return await axios.put<Empleado>(`${API}/empleados`)
}
export const deleteEmpleado = async (id: string, token:string) => {
    return await axios.delete<Empleado>(`${API}/empleados/${id}/${token}`)
}