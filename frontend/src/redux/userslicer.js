import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: [],
    db: ""
};

const userslicer = createSlice({
    name: "user",
    initialState,
    reducers: {
        AddUser: (state, action) => {
            state.data = action.payload.data;
            state.db = action.payload.db;
        },
        RemoveUser: (state) => {
            state.data.pop();
            state.db = ""; // Reset db when removing a user
        },
        UpdateUser: (state, action) => {
            state.data=action.payload.data; // Replace the entire state with the new object
        },
    }
});

export const { AddUser, RemoveUser,UpdateUser } = userslicer.actions;
export default userslicer.reducer;
