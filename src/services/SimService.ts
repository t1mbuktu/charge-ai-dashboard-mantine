import { addDoc, collection, deleteDoc, doc, getDocs, query, updateDoc, where } from "@firebase/firestore";
import { db } from "../config/firebase";
import { SimulationEntry } from "../models/SimulationEntry";

const simCollection = collection(db, 'sim-entries')

export class SimService {
    public static async get(userId: string): Promise<SimulationEntry[] > {

        const q =  query(simCollection, where("uid", "==", userId));
        const data = await getDocs(q);

        return data.docs.map(doc => ({ ...doc.data(), id: doc.id})) as SimulationEntry[]
    }
    
    public static async add(sim: SimulationEntry): Promise<SimulationEntry> {
        const { id , ...simWithoutId } = sim
        const data = await addDoc(simCollection, simWithoutId);

        return {...sim, id: data.id}
    }

    public static async update(sim: SimulationEntry): Promise<SimulationEntry> {
        const { id , ...simWithoutId } = sim
        const simDoc = doc(db, 'sim-entries', id!);

        await updateDoc(simDoc, simWithoutId);
        return sim;
    }

    public static async delete(sim: SimulationEntry): Promise<SimulationEntry> {
        const simDoc = doc(db, 'sim-entries', sim.id!);

        await deleteDoc(simDoc);
        return sim
    }
}