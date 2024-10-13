export interface ICompany {
  id: string;
  name: string;
  address: string;
}

export interface ICompaniesState {
  companies: ICompany[];
  loading: boolean;
}
