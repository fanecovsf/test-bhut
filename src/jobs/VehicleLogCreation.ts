import BackgroundJob from "../interfaces/BackgroundJob";
import { localAxios } from "@/config/axios";
import { AxiosError } from "axios";


export default class VehicleLogCreation implements BackgroundJob {
    public async handler(data: Record<string, any>) {
        try {
            data.data_hora_processamento = new Date().toISOString()

            await localAxios.post(
                '/logs',
                data
            )

            console.log(`Log criado, car_id: ${data.car_id}`)
        } catch (e) {
            if (e instanceof AxiosError) {
                console.error(e.response?.data)
            } else {
                console.error(e)
            }
        }
    }
}
