import { object, string, date } from "yup";


const logCreationSchema = object({
    data_hora_criacao: date().required(),
    data_hora_processamento: date().required(),
    car_id: string().strict().required()
})

export {
    logCreationSchema
}
