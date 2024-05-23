import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { StateStatus } from "../../models/enums/StateStatus";
import { SettingsState } from "./SettingsState";
import { GeneralSettings } from "../../models/GeneralSettings";
import { SettingsService } from "../../services/SettingsService";

const initialState: SettingsState = {
    settings: undefined,
    status: StateStatus.idel
}

export const fetchSettings = createAsyncThunk('sims/fetchSettings', async (userId: string): Promise<GeneralSettings> => {
    return await SettingsService.get(userId);
});

export const saveSettings = createAsyncThunk('sims/saveSettings', async (settings: GeneralSettings): Promise<GeneralSettings> => {
    if(settings.id) {
        return await SettingsService.update(settings);
    } else {
        return await SettingsService.add(settings);
    }
});

export const deleteSettings = createAsyncThunk('sims/deleteSettings', async (settings: GeneralSettings): Promise<GeneralSettings> => {
    return await SettingsService.delete(settings);
});

export const SettingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers:{
        
    },
    extraReducers(builder) {
        //fetchSettings
        builder.addCase(fetchSettings.pending, (state) => {
            state.status = StateStatus.loading;
        });

        builder.addCase(fetchSettings.fulfilled, (state, {payload}) => {
            state.settings = payload;
            state.status = StateStatus.succeeded;
        });

        builder.addCase(fetchSettings.rejected, (state, payload) => {
            state.status = StateStatus.failed;
            state.errorMsg = payload.error.message;
        });

        //saveSettings
        builder.addCase(saveSettings.pending, (state) => {
            state.status = StateStatus.loading;
        });

        builder.addCase(saveSettings.fulfilled, (state, {payload}) => {
            state.settings = payload;
            state.status = StateStatus.succeeded;
        });

        builder.addCase(saveSettings.rejected, (state, payload) => {
            state.status = StateStatus.failed;
            state.errorMsg = payload.error.message;
        });

        //deleteSettings
        builder.addCase(deleteSettings.pending, (state) => {
            state.status = StateStatus.loading;
        });

        builder.addCase(deleteSettings.fulfilled, (state) => {
            state.settings = undefined;
            state.status = StateStatus.succeeded;
        });

        builder.addCase(deleteSettings.rejected, (state, payload) => {
            state.status = StateStatus.failed;
            state.errorMsg = payload.error.message;
        });
    }
})

export const {  } = SettingsSlice.actions;
export default SettingsSlice.reducer;