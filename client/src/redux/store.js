import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./reducers/auth";
import api from "./api/api";
import MiscSlice from "./reducers/misc";
import chatSlice from "./reducers/chat";

const store=configureStore({
    reducer:{
        [authSlice.name]:authSlice.reducer,
        [MiscSlice.name]:MiscSlice.reducer,
        [chatSlice.name]:chatSlice.reducer,
        [api.reducerPath]:api.reducer,
    },
    middleware:(defaultMiddleware)=>[...defaultMiddleware(),api.middleware]
})

export default store