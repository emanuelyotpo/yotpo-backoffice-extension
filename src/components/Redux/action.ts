import { ActionType } from "./actionTypes";

export interface Action {
    type: ActionType;
    payload?: any;
}