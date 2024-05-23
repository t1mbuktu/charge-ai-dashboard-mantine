import { DefaultState } from "../../models/DefaultState";
import { SimulationEntry } from "../../models/SimulationEntry"

export type SimulationEntriesState = {
    simEntries: SimulationEntry[];
} & DefaultState