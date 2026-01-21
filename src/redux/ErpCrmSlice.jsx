import { createSlice } from "@reduxjs/toolkit";

const erpCrmSlice = createSlice({
    name:"system",
    initialState:{
        current:null,
    },

    reducers:{
        switchSystem:(state,action) => {
            state.current = action.payload;
        }
    }
});

export const {switchSystem} = erpCrmSlice.actions;
export default erpCrmSlice.reducer;