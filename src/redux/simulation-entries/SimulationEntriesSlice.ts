import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { StateStatus } from "../../models/enums/StateStatus";
import { SimulationEntriesState } from "./SimulationEntriesState";
import { SimulationEntry } from "../../models/SimulationEntry";
import { SimService } from "../../services/SimService";

const initialState: SimulationEntriesState = {
    simEntries: [],
    status: StateStatus.idel
}

export const fetchSims = createAsyncThunk('sims/fetchSims', async (userId: string): Promise<SimulationEntry[]> => {
    return await SimService.get(userId);
});

export const saveSim = createAsyncThunk('sims/saveSim', async (sim: SimulationEntry): Promise<SimulationEntry> => {
    if(sim.id) {
        return await SimService.update(sim);
    } else {
        return await SimService.add(sim);
    }
});

export const deleteSim = createAsyncThunk('sims/deleteSim', async (sim: SimulationEntry): Promise<SimulationEntry> => {
    return await SimService.delete(sim);
});

export const SimulationEntriesSlice = createSlice({
    name: 'sims',
    initialState,
    reducers:{
        
    },
    extraReducers(builder) {
        //fetchSims
        builder.addCase(fetchSims.pending, (state) => {
            state.status = StateStatus.loading;
        });

        builder.addCase(fetchSims.fulfilled, (state, {payload}) => {
            state.simEntries = payload;
            state.status = StateStatus.succeeded;
        });

        builder.addCase(fetchSims.rejected, (state, payload) => {
            state.status = StateStatus.failed;
            state.errorMsg = payload.error.message;
        });

        //addSim
        builder.addCase(saveSim.pending, (state) => {
            state.status = StateStatus.loading;
        });

        builder.addCase(saveSim.fulfilled, (state, {payload}) => {
            if(state.simEntries.find(c => c.id! === payload.id) === undefined) {
                state.simEntries.push(payload);
            } else {
                state.simEntries = state.simEntries.map(c => c.id! === payload.id ? payload : c);
            }
            state.status = StateStatus.succeeded;
        });

        builder.addCase(saveSim.rejected, (state, payload) => {
            state.status = StateStatus.failed;
            state.errorMsg = payload.error.message;
        });

        //deleteCar
        builder.addCase(deleteSim.pending, (state) => {
            state.status = StateStatus.loading;
        });

        builder.addCase(deleteSim.fulfilled, (state, {payload}) => {
            state.simEntries = state.simEntries.filter(c => c.id !== payload.id);
            state.status = StateStatus.succeeded;
        });

        builder.addCase(deleteSim.rejected, (state, payload) => {
            state.status = StateStatus.failed;
            state.errorMsg = payload.error.message;
        });
    }
})

export const {  } = SimulationEntriesSlice.actions;
export default SimulationEntriesSlice.reducer;