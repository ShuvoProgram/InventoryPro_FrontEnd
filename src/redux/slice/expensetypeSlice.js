import { createSlice } from "@reduxjs/toolkit";
export const expenseTypeSlice = createSlice({
  name: "expenseType",
  initialState: {
    List: [],
    ListTotal: 0,
    FormValue: {
      Name: "",
    },
  },
  reducers: {
    SetExpenseTypeList: (state, action) => {
      state.List = action.payload;
    },
    SetExpenseTypeListTotal: (state, action) => {
      state.ListTotal = action.payload;
    },
    OnChangeExpenseTypeInput: (state, action) => {
      state.FormValue[`${action.payload.Name}`] = action.payload.Value;
    },
    ResetExpenseTypeFormValue: (state, action) => {
      Object.keys(state.FormValue).forEach((i) => (state.FormValue[i] = ""));
    },
  },
});

export const {
  SetExpenseTypeList,
  SetExpenseTypeListTotal,
  OnChangeExpenseTypeInput,
  ResetExpenseTypeFormValue,
} = expenseTypeSlice.actions;
export default expenseTypeSlice.reducer;
