import { ActionType } from "./ActionTypes";

export interface Action {
    type: ActionType;
    payload?: any;
}