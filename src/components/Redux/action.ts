import { ActionType } from "./action-types";

export interface Action {
    type: ActionType;
    payload?: any;
}