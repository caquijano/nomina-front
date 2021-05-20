import axios from "axios";
import { Setting } from "./Setting";
import config from '../../config'

const API = config.API_HOST

export const createSetting = async (setting:Setting , token:string) => {
    return await axios.post(`${API}/settings/${token}`, setting)
}
export const getSettings = async () => {
    return await axios.get(`${API}/settings`)
}
export const getSetting = async (id: string) => {
    return await axios.get<Setting>(`${API}/settings/${id}`)
}
export const updateSetting = async (id: string, setting:Setting, token:string) => {
    return await axios.put<Setting>(`${API}/settings`)
}
export const deleteSetting = async (id: string, token:string) => {
    return await axios.delete<Setting>(`${API}/settings/${id}/${token}`)
}