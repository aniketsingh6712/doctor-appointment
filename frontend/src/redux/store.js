import { configureStore } from "@reduxjs/toolkit";

import userReducer  from "./userslicer";
export const store=configureStore({
    reducer:{
    
        user:userReducer,
    },
});

