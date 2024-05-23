import { addDoc, collection, deleteDoc, doc, getDocs, query, updateDoc, where } from "@firebase/firestore";
import { GeneralSettings } from "../models/GeneralSettings";
import { db } from "../config/firebase";

const settingsCol = collection(db, 'general-settings');

export class SettingsService {

    public static async get(userId: string): Promise<GeneralSettings> {
        const q =  query(settingsCol, where("uid", "==", userId));
        const data = await getDocs(q);

        return data.docs.map(doc => ({...doc.data(), id: doc.id}))[0] as GeneralSettings
    }
    
    public static async add(settings: GeneralSettings): Promise<GeneralSettings> {
        const { id , ...settingsWithoutId } = settings;
        const data = await addDoc(settingsCol, settingsWithoutId);

        return {...settings, id: data.id}
    }

    public static async update(settings: GeneralSettings): Promise<GeneralSettings> {
        const { id , ...settingsWithoutId } = settings;
        const settingsDoc = doc(db, 'general-settings', id!);

        await updateDoc(settingsDoc, settingsWithoutId);
        return settings;
    }

    public static async delete(settings: GeneralSettings): Promise<GeneralSettings> {
        const settingsDoc = doc(db, 'general-settings', settings.id!);

        await deleteDoc(settingsDoc);
        return settings
    }
}
