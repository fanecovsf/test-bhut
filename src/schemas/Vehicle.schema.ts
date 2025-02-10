import { object, string, number } from "yup";


const vehicleCreationSchema = object({
    nome: string().strict().required(),
    marca: string().strict().required(),
    preco: number().strict().positive().required(),
    anoFabricacao: number().strict().positive().max(new Date().getFullYear() + 1)
})

export {
    vehicleCreationSchema
}