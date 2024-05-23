import { DefaultState } from "../../models/DefaultState"
import { User } from "../../models/User"

export type CommonState = {
    currentUser?: User
} & DefaultState