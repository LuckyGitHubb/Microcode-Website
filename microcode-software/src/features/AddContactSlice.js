import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// ✅ API function
export const addContactAPI = createAsyncThunk(
  "addContact/submit",
  async (value, { rejectWithValue }) => {
    try {
      // const url ="https://www.ns6.microcodepgmt.com/contact/post";
      const url ="http://localhost:3300/contact/post";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: value.name,
          mobile: value.mobile,
          email: value.email,
          description: value.description,
        }),
      });

      if (!response.ok) {
        // If server returns error (like 400, 500 etc)
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to submit");
      }

      const res = await response.json();
      return res;
    } catch (error) {
      console.error("The Error is", error);
      return rejectWithValue(error.message || "Network error");
    }
  }
);

// ✅ Redux slice
const addContactSlice = createSlice({
  name: "addContact",
  initialState: {
    loading: false,
    addContact: [],
    successMessage: "",
    error: "",
  },
  extraReducers: (builder) => {
    builder
      .addCase(addContactAPI.pending, (state) => {
        state.loading = true;
        state.successMessage = "";
        state.error = "";
      })
      .addCase(addContactAPI.fulfilled, (state, action) => {
        // console.log("action data -----> ",action.payload)
        state.loading = false;
        state.successMessage =
          action.payload?.message || "Contact added successfully.";
        state.addContact = action.payload;
      })
      .addCase(addContactAPI.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload || action.error.message || "Something went wrong.";
        state.successMessage = "";
      });
  },
});

export default addContactSlice;
