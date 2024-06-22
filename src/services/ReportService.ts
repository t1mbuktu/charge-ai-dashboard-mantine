import { Car } from "../models/Car";
import { GeneralSettings } from "../models/GeneralSettings";
import { SimulationEntry } from "../models/SimulationEntry";
import axios from "axios";
import { reportURI } from "../constants/index"
import { Report } from "../models/Report";
import dayjs from "dayjs";

const data = JSON.stringify({
    "settings": {
        "numberOfSolarModules": 10,
        "powerPerModule": 300,
        "surface": 30,
        "location": {
            "latitude": 52.520000,
            "longitude": 13.405000
        }
    },
    "cars": [
        {
            "id": "car1",
            "name": "Auto1",
            "hybrid": false,
            "batteryLevel": 0.5,
            "batteryCapacity": 62,
            "chargeLimit": 1,
            "maxChargeSpeed": 22,
            "currentlyCharging": false,
            "currentChargingSpeed": 0,
            "currentSolarChargingSpeed": 0,
            "currentGridChargingSpeed": 0
        },
        {
            "id": "car2",
            "name": "Auto2",
            "hybrid": false,
            "batteryLevel": 0.8,
            "batteryCapacity": 50,
            "chargeLimit": 1,
            "maxChargeSpeed": 20,
            "currentlyCharging": false,
            "currentChargingSpeed": 0,
            "currentSolarChargingSpeed": 0,
            "currentGridChargingSpeed": 0
        }
    ],
    "sim_data": [
        {
            "carId": "car1",
            "data": [
                {
                    "from": "2024-05-23T08:00",
                    "to": "2024-05-23T10:00",
                    "batteryLevel": 0.2
                },
                {
                    "from": "2024-05-24T09:00",
                    "to": "2024-05-24T16:00",
                    "batteryLevel": 0.2
                },
                {
                    "from": "2024-05-25T08:30",
                    "to": "2024-05-25T10:30",
                    "batteryLevel": 0.2
                },
                {
                    "from": "2024-05-26T07:00",
                    "to": "2024-05-26T09:00",
                    "batteryLevel": 0.19
                },
                {
                    "from": "2024-05-27T08:00",
                    "to": "2024-05-27T10:00",
                    "batteryLevel": 0.18
                },
                {
                    "from": "2024-05-28T08:00",
                    "to": "2024-05-28T10:00",
                    "batteryLevel": 0.2
                },
                {
                    "from": "2024-05-29T09:00",
                    "to": "2024-05-29T11:00",
                    "batteryLevel": 0.22
                }
            ]
        },
        {
            "carId": "car2",
            "data": [
                {
                    "from": "2024-05-23T10:00",
                    "to": "2024-05-23T14:00",
                    "batteryLevel": 0.5
                },
                {
                    "from": "2024-05-24T08:00",
                    "to": "2024-05-24T12:00",
                    "batteryLevel": 0.7
                },
                {
                    "from": "2024-05-25T12:00",
                    "to": "2024-05-25T17:00",
                    "batteryLevel": 0.65
                },
                {
                    "from": "2024-05-26T09:00",
                    "to": "2024-05-26T12:00",
                    "batteryLevel": 0.9
                },
                {
                    "from": "2024-05-27T12:00",
                    "to": "2024-05-27T18:00",
                    "batteryLevel": 0.6
                },
                {
                    "from": "2024-05-28T10:00",
                    "to": "2024-05-28T14:00",
                    "batteryLevel": 0.4
                },
                {
                    "from": "2024-05-29T08:00",
                    "to": "2024-05-29T16:00",
                    "batteryLevel": 0.85
                }
            ]
        }
    ]
})

export class ReportService {

    public static async get(settings: GeneralSettings, cars: Car[], sim_data: SimulationEntry[]): Promise<Report> {

        const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: reportURI,
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify({
                settings: settings,
                cars: cars,
                sim_data: this.getFormattedSimData(cars, sim_data)
            })
        };
        
        const res = await axios.request(config)

        return res.data as Report
    }

    private static getFormattedSimData(cars: Car[], sim_data: SimulationEntry[]): {carId: string, data: SimulationEntry[]}[] {
        const formattedSimData: {carId: string, data: SimulationEntry[]}[] = []

        cars.forEach(car => {
            formattedSimData.push({
                carId: car.id!,
                data: sim_data
                    .filter(sim => sim.carId === car.id)
                    .sort((a, b) => {
                        return dayjs(a.from).isAfter(dayjs(b.from)) ? 1 : -1;
                    })
            })
        });

        return formattedSimData
    }
}