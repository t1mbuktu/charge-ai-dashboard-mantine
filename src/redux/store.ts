import { configureStore } from '@reduxjs/toolkit'
import commonReducer from "./common/CommonSlice"
import carsReducer from "./car/CarSlice"
import simsReducer from "./simulation-entries/SimulationEntriesSlice"
import settingsReducer from './settings/SettingsSlice'

export const store = configureStore({
  reducer: {
    common: commonReducer,
    cars: carsReducer,
    sims: simsReducer,
    settings: settingsReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;