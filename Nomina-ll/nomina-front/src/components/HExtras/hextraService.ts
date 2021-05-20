import axios from "axios";
import { HExtra } from "./HExtra";
import config from '../../config'

const API = config.API_HOST

export const createHExtra = async (hextra:HExtra , token:string) => {
    return await axios.post(`${API}/hextras/${token}`, hextra)
}
export const getHExtras = async () => {
    return await axios.get(`${API}/hextras`)
}
export const getHExtra = async (id: string) => {
    return await axios.get<HExtra>(`${API}/hextras/${id}`)
}
export const updateHExtra = async (id: string, hextra:HExtra, token:string) => {
    return await axios.put<HExtra>(`${API}/hextras`)
}
export const deleteHExtra = async (id: string, token:string) => {
    return await axios.delete<HExtra>(`${API}/hextras/${id}/${token}`)
}