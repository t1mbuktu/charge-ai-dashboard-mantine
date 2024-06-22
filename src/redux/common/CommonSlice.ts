import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CommonState } from "./CommonState";
import { StateStatus } from "../../models/enums/StateStatus";
import { AuthService } from "../../services/AuthService";
import { User } from "../../models/User";

const initialState: CommonState = {
    currentUser: undefined,
    status: StateStatus.idel
}

type LoginCreds = {
    email: string,
    password: string
}

export const signUpUser = createAsyncThunk('common/signUpUser', async ({email, password}: LoginCreds): Promise<User> => {
    return await AuthService.handleSignUp(email, password)
});

export const signInUser = createAsyncThunk('common/singInUser', async ({email, password}: LoginCreds): Promise<User> => {
    return await AuthService.handleSignIn(email, password)
});

export const signInUserGoogle = createAsyncThunk('common/signInUserGoogle', async (): Promise<User> => {
    return await AuthService.handleGoogleSignIn();
});

export const signOutUser = createAsyncThunk('common/signOutUser', async (): Promise<void> => {
    return await AuthService.handleSignOut();
});

export const commonSlice = createSlice({
    name: 'common',
    initialState,
    reducers:{
        getLoggedInUser(state) {
            const user = AuthService.getLoggedInUser();
            user ? state.currentUser = user : state.currentUser = undefined
            state.status = StateStatus.succeeded;
        }
    },
    extraReducers(builder) {
        // signUpUser
        builder.addCase(signUpUser.pending, (state) => {
            state.status = StateStatus.loading
        });
        builder.addCase(signUpUser.fulfilled, (state, { payload }) => {
            state.status = StateStatus.succeeded
            state.currentUser = payload
        });
        builder.addCase(signUpUser.rejected, (state, payload ) => {
            state.status = StateStatus.failed
            state.errorMsg = payload.error.message
        });

        // signInUser
        builder.addCase(signInUser.pending, (state) => {
            state.status = StateStatus.loading
        });
        builder.addCase(signInUser.fulfilled, (state, { payload }) => {
            state.status = StateStatus.succeeded
            state.currentUser = payload
        });
        builder.addCase(signInUser.rejected, (state, payload ) => {
            state.status = StateStatus.failed
            state.errorMsg = payload.error.message
        });

        //signInUserGoogle
        builder.addCase(signInUserGoogle.pending, (state) => {
            state.status = StateStatus.loading
        });
        builder.addCase(signInUserGoogle.fulfilled, (state, { payload }) => {
            state.status = StateStatus.succeeded
            state.currentUser = payload
        });
        builder.addCase(signInUserGoogle.rejected, (state, payload ) => {
            state.status = StateStatus.failed
            state.errorMsg = payload.error.message
        });

        //signOutUser
        builder.addCase(signOutUser.pending, (state) => {
            state.status = StateStatus.loading
        });
        builder.addCase(signOutUser.fulfilled, (state) => {
            state.status = StateStatus.succeeded
            state.currentUser = undefined
        });
        builder.addCase(signOutUser.rejected, (state, payload ) => {
            state.status = StateStatus.failed
            state.errorMsg = payload.error.message
        });
    }
})

export const { getLoggedInUser } = commonSlice.actions;
export default commonSlice.reducer;