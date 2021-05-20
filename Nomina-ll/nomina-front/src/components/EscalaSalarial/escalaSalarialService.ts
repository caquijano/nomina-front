import axios from "axios";
import { EscalaSalarial } from "./EscalaSalarial";
import config from '../../config' 

const API = config.API_HOST

export const createEscalaSalarial = async (escalaSalarial:EscalaSalarial , token:string) => {
    return await axios.post(`${API}/escalasalarial/${token}`, escalaSalarial)
}
export const getEscalaSalariales = async () => {
    return await axios.get(`${API}/escalasalarial`)
}
export const getEscalaSalarial = async (id: string) => {
    return await axios.get<EscalaSalarial>(`${API}/escalasalarial/${id}`)
}
export const updateEscalaSalarial = async (id: string, escalaSalarial:EscalaSalarial) => {
    return await axios.put<EscalaSalarial>(`${API}/escalasalarial`)
}
export const deleteEscalaSalarial = async (id: string, token:string) => {
    return await axios.delete<EscalaSalarial>(`${API}/escalasalarial/${id}/${token}`)
}