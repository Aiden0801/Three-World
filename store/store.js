import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { browserSlice } from './browserSlice';
import { createWrapper } from "next-redux-wrapper";

const makeStore = () =>
    configureStore({
        reducer: {
            [browserSlice.name]: browserSlice.reducer,
        },
        devTools: true,
    });

export const wrapper = createWrapper(makeStore);