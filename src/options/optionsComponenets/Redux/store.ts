import { createStore } from "redux";
import { reduce } from "./reducer";

export const store = createStore(reduce)