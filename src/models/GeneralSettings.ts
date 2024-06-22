export type GeneralSettings = {
    id?: string
    uid: string
    surface?: number
    numberOfSolarModules?: number
    powerPerModule?: number
    zip?: number
    location?: Location
    feedInRemuneration_kwh?: number
    electricityPrice_kwh?: number
    setupCompleted: boolean
};

export type Location = {
    latitude?: number,
    longitude?: number
}