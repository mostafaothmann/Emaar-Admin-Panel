import { create } from 'zustand';
import axios from 'axios';
import { persist, createJSONStorage } from 'zustand/middleware';
import { useAuthStore } from './auth.store';
import { apiCPO, apiCustomer } from '../api';


// 🧩 Interfaces
export interface CustomerOffer {
  Customerid: number;
  Propertyid: number;
  date: Date;
  budget: number;
  description: string;
  endDate: Date;
  owner_customer_comment: string;
  isActive: number;
}

export interface Property {
  id: number;
  location: string;
  direction: number;
  maximum_time: string;
  minimum_budget: number;
  height: string;
  age: number;
  description: string;
  area: number;
  isActive: number;
  typeOfPropertyId: number;
  typeOfOwneringId: number;
  typeOfWorkId: number;
  statusId: number;
  customerId: number | null;
}

export interface Customer {
  firstName: string;
  isActive:number;
  age: number;
  lastName: string;
  email: string;
  secondPhone: number;
  photo: string;
  phone: number;
  instaLink: string;
  facebookLink: string;
  linkedinLink: string;
  websiteLink: string;
  description: string;
  location: string;
  password: string;
  role: "CUSTOMER";
  properties: Property[];
  offers:CustomerOffer[]
}

export interface UpdateCustomer {
  firstName: string;
  age: number;
  lastName: string;
  email: string;
  secondPhone: number;
  photo: string;
  isActive:number;
  phone: number;
  instaLink: string;
  facebookLink: string;
  linkedinLink: string;
  websiteLink: string;
  description: string;
  location: string;
  password: string;
}

interface DataStore {
  customerOffers: CustomerOffer[] | null;
  dataCustomer: Customer;
  dataCustomers:Customer[] | undefined;
  loading: boolean;
  error: string | null;
  signup: (customer: Customer) => Promise<void>;
  getCustomerData: () => Promise<void>;
  updateCustomerData : (customer:UpdateCustomer) =>void;
  getCustomerOffers: () => Promise<void>;
  getCustomersData :()=>Promise<void>;
  editCustomer :(id:number,editedCustomer:UpdateCustomer)=>Promise<void>;
}


export const useCustomerDataStore = create<DataStore>()(
  persist(
    (set, get) => ({
      customerOffers: null,
      dataCustomers:undefined,
      dataCustomer: Object(),
      loading: false,
      error: null,
      // Get Custoemr Data
      getCustomerData: async () => {
        set({ loading: true, error: null });
        try {
          const { authData } = useAuthStore.getState(); // ✅ dynamically get latest auth data
          const res = await apiCustomer.get(`/${authData?.id}`);
          const dataCustomer = res.data
          set({ dataCustomer, loading: false });
          return dataCustomer
        } catch (err: any) {
          set({
            error: err.response?.data?.message || 'Error Loading Properties',
            loading: false,
          });
          console.log(err.response.data)
        }
      },
       // Update Custoemr Data (My Data)
      updateCustomerData: async (updatedCustomerData:UpdateCustomer) => {
        set({ loading: true, error: null });
        try {
          const { authData } = useAuthStore.getState(); // ✅ dynamically get latest auth data
          console.log("hey ther d;afsjdfljasd;fljasd;lfjasd;fj ;fl  ;lfjasd;fl")
          console.log(updatedCustomerData)
          const res = await apiCustomer.patch(`/${authData?.id}`,updatedCustomerData);
          const status = res.status
          set({  loading: false });
          if(status==201)
            console.log("updated")
          return status.toString;
        } catch (err: any) {
          set({
            error: err.response?.data?.message || 'Error Loading Properties',
            loading: false,
          });
          console.log(err.response.data)
        }
      },
       // Edit Custoemr Data (Any Data)
      editCustomer: async (id:number,updatedCustomerData:UpdateCustomer) => {
        set({ loading: true, error: null });
        try {
          const res = await apiCustomer.patch(`/${id}`,updatedCustomerData);
          const status = res.status
          set({  loading: false });
          if(status==201)
          {}
        } catch (err: any) {
          set({
            error: err.response?.data?.message || 'Error Loading Properties',
            loading: false,
          });
          console.log(err.response.data)
        }
      },
      getCustomerOffers: async () => {
        set({ loading: true, error: null });
        try {
          const { authData } = useAuthStore.getState();
          const res = await apiCustomer.get(`/${authData?.id}/offers`);
          const customerOffers = res.data
          set({ customerOffers, loading: false });
          console.log(res.data.message)
          return customerOffers
        } catch (err: any) {
          set({
            error: err.response?.data?.message || 'Error Loading Properties',
            loading: false,
          });
        }
      },
      getCustomersData: async () => {
        set({ loading: true, error: null });
        try {
          const { authData } = useAuthStore.getState();

          const res = await apiCustomer.get(``);
          const dataCustomers = res.data
          set({ dataCustomers, loading: false });
          return dataCustomers

        } catch (err: any) {
          set({
            error: err.response?.data?.message || 'Error Loading Properties',
            loading: false,
          });
        }
      },
      // Signup
      signup: async (dataCustomer: Customer) => {
        set({ loading: true, error: null });

        try {
          const res1 = await apiCustomer.post('', dataCustomer);
          const email = dataCustomer?.email
          const password = dataCustomer?.password
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

      //getAll Properties 👈 used in CustomerProperties,

      //  getProperties:

    }),
    {
      name: 'customer-data-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ data: state.dataCustomer })
    } // AsyncStorage (React Native)
  )
);
