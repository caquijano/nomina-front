import axios from "axios";
import { Nomina } from "./Nomina";
import config from '../../config'

const API = config.API_HOST

export const createNomina = async (Nomina:Nomina , token:string) => {
    return await axios.post(`${API}/Nominas/${token}`, Nomina)
}
export const getNominas = async () => {
    return await axios.get(`${API}/Nominas`)
}
export const getNomina = async (id: string) => {
    return await axios.get<Nomina>(`${API}/Nominas/${id}`)
}
export const updateNomina = async (id: string, Nomina:Nomina, token:string) => {
    return await axios.put<Nomina>(`${API}/Nominas`)
}
export const deleteNomina = async (id: string, token:string) => {
    return await axios.delete<Nomina>(`${API}/Nominas/${id}/${token}`)
}