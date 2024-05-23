import { DefaultState } from "../../models/DefaultState"
import { GeneralSettings } from "../../models/GeneralSettings"

export type SettingsState = {
    settings?: GeneralSettings
} & DefaultState