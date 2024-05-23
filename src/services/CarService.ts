import { addDoc, collection, deleteDoc, doc, getDocs, query, updateDoc, where } from "@firebase/firestore";
import { Car } from "../models/Car";
import { db } from "../config/firebase";

const carCollection = collection(db, 'cars');

export class CarService {

    public static async get(userId: string): Promise<Car[] > {
        const q =  query(carCollection, where("uid", "==", userId));
        const data = await getDocs(q);

        return data.docs.map(doc => ({...doc.data(), id: doc.id})) as Car[]
    }
    
    public static async add(car: Car): Promise<Car> {
        const { id , ...carWithoutId } = car;
        const data = await addDoc(carCollection, carWithoutId);

        return {...car, id: data.id}
    }

    public static async update(car: Car): Promise<Car> {
        const { id , ...carWithoutId } = car;
        const carDoc = doc(db, 'cars', id!);

        await updateDoc(carDoc, carWithoutId);
        return car;
    }

    public static async delete(car: Car): Promise<Car> {
        const carDoc = doc(db, 'cars', car.id!);

        await deleteDoc(carDoc);
        return car
    }
}