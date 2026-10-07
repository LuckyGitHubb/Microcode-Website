import { configureStore } from "@reduxjs/toolkit";
import addContactSlice from "../features/AddContactSlice";

const store = configureStore({
    reducer:{
        addContact: addContactSlice.reducer
    }
})
export default store;