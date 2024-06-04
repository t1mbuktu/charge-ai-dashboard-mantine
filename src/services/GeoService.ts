import axios from "axios";
import { Location } from "../models/GeneralSettings";
import { geoApiURI } from "../constants";

export class GeoService {

    public static async zipToCords(zip: number): Promise<Location> {
        const url = geoApiURI
            .replace('${ZIP}', String(zip))
            .replace('${API_KEY}', `${process.env.REACT_APP_GEO_API_KEY}`)

        const res = await axios.get(url)

        const location = res.data.results[0].geometry.location

        return {latitude: location.lat, longitude: location.lng}
    }
}
