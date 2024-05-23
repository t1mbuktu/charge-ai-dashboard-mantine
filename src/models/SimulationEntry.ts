import { TimeSlot } from "./TimeSlot"

export type SimulationEntry = {
    id?: string;
    carId: string;
    uid: string;
    date: string;
    batteryLevel?: number;
} & TimeSlot