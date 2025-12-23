import { create } from 'zustand';
import axios from 'axios';
import { persist, createJSONStorage } from 'zustand/middleware';
import { useAuthStore } from './auth.store';
import { apiCompany, apiTypeOfCompany } from '../api';


// 🧩 Interfaces

export interface Property {
  id: number;
  location: string;
  direction: string;
  minimum_time: string;
  minimum_budget: string;
  height: string;
  place: string;
  age: number;
  description?: string;
  area: number;
  isActive: number;
  typeOfPropertyId: number;
  typeOfOwneringId: number;
  typeOfWorkId: number;
  statusId: number;
  customerId: number;
  type_of_property_specified: string;
}

export interface Company {
  id: number;
  firstName: string;
  age: number;
  lastName: string;
  email: string;
  secondPhone: number;
  photo: string;
  phone: number;
  instaLink: string;
  typeOfCompanyId: number;
  facebookLink: string;
  linkedinLink: string;
  websiteLink: string;
  description: string;
  location: string;
  password: string;
  isActive: number;
  role: "Company";
  properties: Property[];
}

export interface TypeOfCompany {
  id: number;
  name: string;
  description: string;
}

export interface UpdateTypeOfCompany {
  name: string;
  description: string;
}

export interface UpadteCompany {
  firstName: string;
  age: number;
  lastName: string;
  email: string;
  isActive: number;
  secondPhone: number;
  photo: string;
  phone: number;
  instaLink: string;
  typeOfCompanyId: number;
  facebookLink: string;
  linkedinLink: string;
  websiteLink: string;
  description: string;
  location: string;
  password: string;
  role: "Company";
  properties: Property[];
}


interface DataStore {
  companyD: Company;
  dataCompanies: Company[] | undefined;
  dataTypesOfCompanies: TypeOfCompany[] | undefined;
  loading: boolean;
  error: string | null;
  signup: (company: Company) => Promise<void>;
  getCompanyData: () => Promise<void>;
  getCompaniesData: () => Promise<void>;
  getTypesOfCompaniesData: () => Promise<void>;
  editTypeOfCompany: (id: number, updateTypeOfCompany: UpdateTypeOfCompany) => Promise<void>;
  deleteTypeOfCompany: (id: number) => Promise<void>;
  editCompany: (id: number, editedCustomer: UpadteCompany) => Promise<void>;
  addTypeOfCompany: (addedCustomer: UpdateTypeOfCompany) => Promise<void>;
}


export const useCompanyDataStore = create<DataStore>()(
  persist(
    (set, get) => ({
      dataCompanies: undefined,
      dataTypesOfCompanies: undefined,
      companyD: Object(),
      loading: false,
      error: null,
      // Get Custoemr Data
      getCompanyData: async () => {
        set({ loading: true, error: null });
        try {
          const { authData } = useAuthStore.getState(); // ✅ dynamically get latest auth data
          const res = await apiCompany.get(`/${authData?.id}`);
          const companyD = res.data
          set({ companyD, loading: false });
          return companyD
        } catch (err: any) {
          set({
            error: err.response?.data?.message || 'Error Loading Properties',
            loading: false,
          });
        }
      },

      // Get Companies Data
      getCompaniesData: async () => {
        set({ loading: true, error: null });
        try {
          const res = await apiCompany.get(``);
          const dataCompanies = res.data
          set({ dataCompanies, loading: false });
          return dataCompanies
        } catch (err: any) {
          set({
            error: err.response?.data?.message || 'Error Loading Materials',
            loading: false,
          });
        }
      },
      // Get Companies Data
      getTypesOfCompaniesData: async () => {
        set({ loading: true, error: null });
        try {
          const res = await apiTypeOfCompany.get(``);
          const dataTypesOfCompanies = res.data
          set({ dataTypesOfCompanies, loading: false });
          return dataTypesOfCompanies
        } catch (err: any) {
          set({
            error: err.response?.data?.message || 'Error Loading Materials',
            loading: false,
          });
        }
      },
      // Signup
      signup: async (companyD: Company) => {
        set({ loading: true, error: null });

        try {
          const res1 = await apiCompany.post('', companyD);
          const email = companyD?.email
          const password = companyD?.password
          if (res1.status == 201) {
            const { login } = useAuthStore.getState()
            login(email, password);
          }
        } catch (err: any) {

          if (err.status == "500") {
            //alert(err.status)
          }

          set({
            error: err.response?.data?.code || 'Login failed',
            loading: false,
          });
        }
      },
      // Edit Company Data (Any Data)
      editCompany: async (id: number) => {
        set({ loading: true, error: null });
        try {
          const res = await apiCompany.patch(`/${id}`);
          const status = res.status
          set({ loading: false });
          if (status == 201) { }
        } catch (err: any) {
          set({
            error: err.response?.data?.message || 'Error Loading Properties',
            loading: false,
          });
          console.log(err.response.data)
        }
      },
      editTypeOfCompany: async (id: number, updateTypeOFCompany: UpdateTypeOfCompany) => {
        set({ loading: true, error: null });
        try {
          const res = await apiTypeOfCompany.patch(`/${id}`, updateTypeOFCompany);
          if (res.status == 201) { }
        } catch (err: any) {
          set({
            error: err.response?.data?.message || 'Error Loading Properties',
            loading: false,
          });
        }
      },
      //Adding New Type of Company to the DB
      addTypeOfCompany: async (typeOfCompany: UpdateTypeOfCompany) => {
        set({ loading: true, error: null });
        try {
          const res = await apiTypeOfCompany.post(``, typeOfCompany);
          if (res.status != 201) { alert("not added") }
        } catch (err: any) {
          set({
            error: err.response?.data?.message || 'Error Loading Materials',
            loading: false,
          });
        }
      },
      //Editing TypeOfWork
      deleteTypeOfCompany: async (id: number) => {
        set({ loading: true, error: null });
        try {
          const res = await apiTypeOfCompany.delete(`/${id}`);
          if (res.status != 201) { alert("not added") }

        } catch (err: any) {
          set({
            error: err.response?.data?.message || 'Error Loading Materials',
            loading: false,
          });
        }
      },

      //getAll Companies 👈 used in CustomerCompanies,

      //  getProperties:

    }),
    {
      name: 'company-data-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ data: state.dataCompanies })
    } // AsyncStorage (React Native)
  )
);
