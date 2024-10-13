import { createContext, FC, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../../types";
import { CustomTable, IColumn } from "../CustomTable/CustomTable";
import {
  fetchCompanies,
  setCompanies,
  setLoading,
} from "../../store/slices/companies.slice";
import { ICompaniesState, ICompany } from "../../types/companies";
import { useFormik } from "formik";
import { createGuid } from "../../utils";
import { companiesData } from "../../helpers/data";

export const CompaniesContext = createContext<{ onUpdate: any }>({
  onUpdate: null,
});

export const CompaniesTable: FC = () => {
  const dispatch = useDispatch();
  const { loading, companies }: ICompaniesState = useSelector(
    (state: State) => state.companies
  );

  let timeout: any = null;

  const fetchData = () => {
    if (timeout) clearTimeout(timeout);

    dispatch(setLoading(true));
    timeout = setTimeout(() => {
      dispatch(
        fetchCompanies({
          loading: false,
          companies: [...companies, ...companiesData()],
        })
      );
    }, 1000);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns: IColumn[] = [
    { name: "name", title: "Имя компании" },
    { name: "address", title: "Адрес" },
  ];

  const onUpdate = (id: string, prop: keyof ICompany, value: string) => {
    dispatch(
      setCompanies(
        companies.map((company) => {
          if (id === company.id) {
            company = { ...company, [prop]: value };
          }
          return company;
        })
      )
    );
  };
  const onDelete = (activeItems: Map<string, any>) => {
    dispatch(
      setCompanies(companies.filter((company) => !activeItems.has(company.id)))
    );
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      address: "",
    },
    onSubmit: (values) => {
      const company: ICompany = {
        id: createGuid(),
        ...values,
      };
      dispatch(setCompanies([company, ...companies]));
      formik.resetForm();
    },
  });

  return (
    <CompaniesContext.Provider value={{ onUpdate }}>
      <div className="table-wrapper">
        <CustomTable
          keyName={"id"}
          columns={columns}
          items={companies}
          formik={formik}
          onDelete={onDelete}
        />
        {loading ? (
          <>Загрузка...</>
        ) : (
          <button onClick={fetchData}>Загрузить еще</button>
        )}
      </div>
    </CompaniesContext.Provider>
  );
};
