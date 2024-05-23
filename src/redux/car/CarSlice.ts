import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CarState } from "./CarState";
import { CarService } from "../../services/CarService";
import { StateStatus } from "../../models/enums/StateStatus";
import { Car } from "../../models/Car";

const initialState: CarState = {
    cars: [],
    status: StateStatus.idel
}

export const fetchCars = createAsyncThunk('cars/fetchCars', async (userId: string): Promise<Car[]> => {
    return await CarService.get(userId);
});

export const saveCar = createAsyncThunk('cars/saveCar', async (car: Car): Promise<Car> => {
    if(car.id) {
        return await CarService.update(car);
    } else {
        return await CarService.add(car);
    }
});

export const deleteCar = createAsyncThunk('cars/deleteCar', async (car: Car): Promise<Car> => {
    return await CarService.delete(car);
});

export const carSlice = createSlice({
    name: 'cars',
    initialState,
    reducers:{
        
    },
    extraReducers(builder) {
        //fetchCars
        builder.addCase(fetchCars.pending, (state) => {
            state.status = StateStatus.loading;
        });

        builder.addCase(fetchCars.fulfilled, (state, {payload}) => {
            state.cars = payload;
            state.status = StateStatus.succeeded;
        });

        builder.addCase(fetchCars.rejected, (state, payload) => {
            state.status = StateStatus.failed;
            state.errorMsg = payload.error.message;
        });

        //addCar
        builder.addCase(saveCar.pending, (state) => {
            state.status = StateStatus.loading;
        });

        builder.addCase(saveCar.fulfilled, (state, {payload}) => {
            if(state.cars.find(c => c.id! === payload.id) === undefined) {
                state.cars.push(payload);
            } else {
                state.cars = state.cars.map(c => c.id! === payload.id ? payload : c);
            }
            state.status = StateStatus.succeeded;
        });

        builder.addCase(saveCar.rejected, (state, payload) => {
            state.status = StateStatus.failed;
            state.errorMsg = payload.error.message;
        });

        //deleteCar
        builder.addCase(deleteCar.pending, (state) => {
            state.status = StateStatus.loading;
        });

        builder.addCase(deleteCar.fulfilled, (state, {payload}) => {
            state.cars = state.cars.filter(c => c.id !== payload.id);
            state.status = StateStatus.succeeded;
        });

        builder.addCase(deleteCar.rejected, (state, payload) => {
            state.status = StateStatus.failed;
            state.errorMsg = payload.error.message;
        });
    }
})

export const {  } = carSlice.actions;
export default carSlice.reducer;