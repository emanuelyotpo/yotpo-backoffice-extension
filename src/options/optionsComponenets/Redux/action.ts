import { OptionsActionType } from "./optionsActionTypes";

export interface Action {
    type: OptionsActionType;
    payload?: any;
}