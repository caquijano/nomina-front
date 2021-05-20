import axios from "axios";
import { User } from "./User";
import config from '../../config'

const API = config.API_HOST

export const createUser = async (user:User) => {
    return await axios.post(`${API}/users`, user)
}
export const getUsers = async () => {
    return await axios.get(`${API}/users`)
}
export const getUser = async (id: string) => {
    return await axios.get<User>(`${API}/users/${id}`)
}
export const sendEmail = async (random:number, user:User) => {
    return await axios.post<User>(`${API}/send-email`,{random, user})
}
export const loginUser = async (email: string, password: string) => {
    return await axios.get<User>(`${API}/users/${email}/${password}`)
}
export const updateUser = async (id: string, user:User) => {
    return await axios.put<User>(`${API}/users`)
}
export const deleteUser = async (id: string, token:string) => {
    return await axios.delete<User>(`${API}/users/${id}/${token}`)
}