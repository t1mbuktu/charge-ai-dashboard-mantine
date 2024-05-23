import { Car } from "../../models/Car"
import { DefaultState } from "../../models/DefaultState"

export type CarState = {
    cars: Car[]
} & DefaultState