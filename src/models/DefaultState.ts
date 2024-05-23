import { StateStatus } from "./enums/StateStatus"

export type DefaultState = {
    status: StateStatus;
    errorMsg?: string;
    checkErrors?: boolean;
}