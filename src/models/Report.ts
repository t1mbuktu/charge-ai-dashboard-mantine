export type Report = {
    diffGridPowerUsed_kwh: number
    diffGridPowerUsed_per: number
    diffSolarPowerUsed_kwh: number
    diffSolarPowerUsed_per: number
    simpleChargingForecast: ForecastData
    smartChargingForecast: ForecastData
    solarForecast: SolarForecastEntry[]
}

export type ForecastData = {
    solarPowerUsed_per: number
    gridPowerUsed_kwh: number
    solarPowerUsed_kwh: number
    chargeForecast: ChargeForecast[]
}

export type ChargeForecast = {
    carId: string
    data: ChargeForecastEntry[]
}

export type ChargeForecastEntry = {
    date: string
    solarForecast?: number
    chargingSpeedSolar?: number
    chargingSpeedGrid?: number
    batteryLevel_kwh?: number
    batteryLevel_per?: number
}

export type SolarForecastEntry = {
    date: string
    speed_kwh: number
}
