import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { StateStatus } from "../../models/enums/StateStatus";
import { ReportState } from "./ReportState";
import { GeneralSettings } from "../../models/GeneralSettings";
import { SimulationEntry } from "../../models/SimulationEntry";
import { Car } from "../../models/Car";
import { ReportService } from "../../services/ReportService";
import { Report } from "../../models/Report";

type ReportInputs = {
    settings: GeneralSettings
    sim_data: SimulationEntry[]
    cars: Car[]
}

const initialState: ReportState = {
    report: undefined,
    status: StateStatus.idel
}

export const getReport = createAsyncThunk('report/getReport', async ({settings, sim_data, cars}: ReportInputs): Promise<Report> => {
    return await ReportService.get(settings, cars, sim_data);
});

export const ReportSlice = createSlice({
    name: 'report',
    initialState,
    reducers:{
        
    },
    extraReducers(builder) {
        //getReport
        builder.addCase(getReport.pending, (state) => {
            state.status = StateStatus.loading;
        });

        builder.addCase(getReport.fulfilled, (state, {payload}) => {
            state.report = payload;
            state.status = StateStatus.succeeded;
        });

        builder.addCase(getReport.rejected, (state, payload) => {
            state.status = StateStatus.failed;
            state.errorMsg = payload.error.message;
        });
    }
})

export const {  } = ReportSlice.actions;
export default ReportSlice.reducer;