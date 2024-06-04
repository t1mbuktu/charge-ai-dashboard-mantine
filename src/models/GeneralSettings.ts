export type GeneralSettings = {
    id?: string
    uid: string
    surface?: number
    numberOfSolarModules?: number
    powerPerModule?: number
    zip?: number
    location?: Location
};

export type Location = {
    latitude?: number,
    longitude?: number
}