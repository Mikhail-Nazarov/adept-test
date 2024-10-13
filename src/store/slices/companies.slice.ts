import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICompaniesState, ICompany } from "../../types/companies";

const initialState: ICompaniesState = {
  loading: false,
  companies: [],
};

const name = "companies";

export const companies = createSlice({
  name,
  initialState,
  reducers: {
    setCompanies: (state, action: PayloadAction<ICompany[]>) => {
      state.companies = action.payload;
      return state;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
      return state;
    },
    fetchCompanies: (state, action: PayloadAction<ICompaniesState>) => {
      state = action.payload;
      return state;
    },
  },
});

export const { setCompanies, fetchCompanies, setLoading } = companies.actions;

export default companies.reducer;
