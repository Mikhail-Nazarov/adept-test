import { ICompany } from "../types/companies";
import { createGuid } from "../utils";

export const companiesData: () => ICompany[] = () => [
  {
    id: createGuid(),
    name: "test1",
    address: "test1test1test1",
  },
  {
    id: createGuid(),
    name: "test2",
    address: "test1test1test1",
  },
  {
    id: createGuid(),
    name: "test3",
    address: "test1test1test1",
  },
];
