import { create } from 'zustand';
import axios from 'axios';
import { apiCPO, apiProperty, apiTypeOfOwnering, apiTypeOfProperty, apiTypeOfWork } from '../api';
import { useAuthStore } from '../customersStore/auth.store';
import { persist, createJSONStorage } from 'zustand/middleware'


// 🧩 Interfaces
export interface CustomerOffer {
  Customerid?: number;
  Propertyid?: number;
  date?: Date;
  budget?: number;
  description?: string;
  endDate?: Date;
  owner_customer_comment?: string;
  isActive?: number;
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
  image1:string;
  image2:string;
  image3:string;
  image4:string;
  image5:string;
}
export interface TypeOfProperty {
  id: number,
  name: string,
  image:string;
  description: string,
}
export interface TypeOfPropertyAdded {
  name: string,
  image:string,
  description: string,
}
export interface TypeOfWork {
  id: number,
  name: string,
  description: string,
}

export interface TypeOfWorkAdded {
  name: string,
  description: string,
}
export interface TypeOfOwnering {
  id: number,
  name: string,
  description: string,
}
export interface TypeOfOwneringAdded {
  name: string,
  description: string,
}
interface DataStore {
  dataProperties: Property[] | undefined;
  dataTypeOfWork: TypeOfWork[] | undefined;
  dataTypeOfProperties: TypeOfProperty[] | undefined;
  dataTypeOfOwnerings: TypeOfOwnering[] | undefined;
  loading: boolean;
  propertyD: Property,
  error: string | null;
  getPropertiesData: () => Promise<void>;
  getTypeOfPropertiesData: () => Promise<void>;
  getTypeOfWorkData: () => Promise<void>;
  getTypeOfOwneringsData: () => Promise<void>;
  getPropertyData: (id: number) => Promise<void>;
  addCustomerOffer: (id: number, offer: CustomerOffer) => Promise<void>;
  addProperty: (property: Property | null) => Promise<void>;
  addTypeOfProperty: (typeOfProperty: TypeOfPropertyAdded) => Promise<void>;
  addTypeOfOwnering: (typeOfOwnering: TypeOfOwneringAdded) => Promise<void>;
  addTypeOfWork: (typeOfWork: TypeOfWorkAdded) => Promise<void>;
  deleteProperty: (id: number) => Promise<void>;
  deleteTypeOfProperty: (id: number) => Promise<void>;
  deleteTypeOfWork: (id: number) => Promise<void>;
  deleteTypeOfOwnering: (id: number) => Promise<void>;
  deleteCustomerOffer: (propertyId: number) => Promise<void>;
  editProperty: (id:number,property: Property) => Promise<void>;
  editTypeOfProperty: (id:number,typeOfProperty: TypeOfPropertyAdded) => Promise<void>;
  editTypeOfWork: (id:number,typeOfWork: TypeOfWorkAdded) => Promise<void>;
  editTypeOfOwnering: (id:number ,typeOfOwnering: TypeOfOwneringAdded) => Promise<void>;
}
//gettig the token from Auth Store 
export const usePropertiesDataStore = create<DataStore>()(
  persist(
    (set, get) => ({
      dataProperties: undefined,
      dataTypeOfProperties: undefined,
      dataTypeOfOwnerings: undefined,
      dataTypeOfWork: undefined,
      propertyD: Object(),
      loading: false,
      error: null,
      // Get Properties Data
      getPropertiesData: async () => {
        set({ loading: true, error: null });
        try {
          const res = await apiProperty.get(``);
          const dataProperties = res.data
          set({ dataProperties, loading: false });
          return dataProperties
        } catch (err: any) {
          set({
            error: err.response?.data?.message || 'Error Loading Properties',
            loading: false,
          });
        }
      },
      // Get Type Of Properties Data
      getTypeOfPropertiesData: async () => {
        set({ loading: true, error: null });
        try {
          const res = await apiTypeOfProperty.get(``);
          const dataTypeOfProperties = res.data
          set({ dataTypeOfProperties, loading: false });
          return dataTypeOfProperties
        } catch (err: any) {
          set({
            error: err.response?.data?.message || 'Error Loading Properties',
            loading: false,
          });
        }
      },
      getTypeOfOwneringsData: async () => {
        set({ loading: true, error: null });
        try {
          const res = await apiTypeOfOwnering.get(``);
          const dataTypeOfOwnerings = res.data
          set({ dataTypeOfOwnerings, loading: false });
          return dataTypeOfOwnerings
        } catch (err: any) {
          set({
            error: err.response?.data?.message || 'Error Loading Properties',
            loading: false,
          });
        }
      },
      // Get Type Of Properties Data
      getTypeOfWorkData: async () => {
        set({ loading: true, error: null });
        try {
          const res = await apiTypeOfWork.get(``);
          const dataTypeOfWork = res.data
          set({ dataTypeOfWork, loading: false });
          return dataTypeOfWork
        } catch (err: any) {
          set({
            error: err.response?.data?.message || 'Error Loading Properties',
            loading: false,
          });
        }
      },
      // get One Property Data  👈
      getPropertyData: async (id: number) => {
        set({ loading: true, error: null });
        try {
          const res = await apiProperty.get(`/${id}`);
          const propertyD = res.data
          set({ propertyD, loading: false });
          return propertyD
        } catch (err: any) {
          set({
            error: err.response?.data?.message || 'Error Loading Properties',
            loading: false,
          });
        }
      },
      deleteProperty: async (id: number) => {
        set({ loading: true, error: null });
        try {
          const res = await apiProperty.delete(`/${id}`);
          const propertyD = res.data
          set({ propertyD, loading: false });
          return propertyD
        } catch (err: any) {
          set({
            error: err.response?.data?.message || 'Error Loading Properties',
            loading: false,
          });
        }
      },
      deleteTypeOfProperty: async (id: number) => {
        set({ loading: true, error: null });
        try {
          const res = await apiTypeOfProperty.delete(`/${id}`);
          if (res.status==201)
            alert("deleted")
        } catch (err: any) {
          set({
            error: err.response?.data?.message || 'Error Loading Properties',
            loading: false,
          });
        }
      },
      deleteTypeOfWork: async (id: number) => {
        set({ loading: true, error: null });
        try {
          const res = await apiTypeOfWork.delete(`/${id}`);
          const propertyD = res.data
          set({ propertyD, loading: false });
          return propertyD
        } catch (err: any) {
          set({
            error: err.response?.data?.message || 'Error Loading Properties',
            loading: false,
          });
        }
      },
      deleteTypeOfOwnering: async (id: number) => {
        set({ loading: true, error: null });
        try {
          const res = await apiTypeOfOwnering.delete(`/${id}`);
          const propertyD = res.data
          set({ propertyD, loading: false });
          return propertyD
        } catch (err: any) {
          set({
            error: err.response?.data?.message || 'Error Loading Properties',
            loading: false,
          });
        }
      },
      addCustomerOffer: async (id: number, offer: CustomerOffer) => {
        set({ loading: true, error: null });
        try {
          const { authData } = useAuthStore.getState();
          offer.Customerid = authData?.id
          offer.Propertyid = id;
          console.log(offer)
          const res = await apiCPO.post(``, offer);
          set({ loading: false });
          if (res.status == 201) {
            alert("Offer Added")
          }
        } catch (err: any) {
          set({
            error: err.response?.data?.message || 'Error Loading Properties',
            loading: false,
          });
        }
      },

      deleteCustomerOffer: async (proeprtyId: number) => {
        set({ loading: true, error: null });
        try {
          const { authData } = useAuthStore.getState();
          const customerId = authData?.id

          const res = await apiCPO.delete(`${customerId}/${proeprtyId}`);
          set({ loading: false });
          if (res.status == 201) {
            alert("Offer Deleted")
          }
        } catch (err: any) {
          set({
            error: err.response?.data?.message || 'Error Loading Properties',
            loading: false,
          });
        }
      },
      //Editing Property
      editProperty: async (id:number,property: Property) => {
        set({ loading: true, error: null });
        try {
          const res = await apiProperty.patch(`/${id}`, property);
          if (res.status != 201) {  }

        } catch (err: any) {
          set({
            error: err.response?.data?.message || 'Error Loading Materials',
            loading: false,
          });
        }
      },
      //Editing TypeOfProperty
      editTypeOfProperty: async (id:number,typeOfProperty: TypeOfPropertyAdded) => {
        set({ loading: true, error: null });
        try {
          const res = await apiTypeOfProperty.patch(`/${id}`, typeOfProperty);
          if (res.status != 201) { alert("not added") }

        } catch (err: any) {
          set({
            error: err.response?.data?.message || 'Error Loading Materials',
            loading: false,
          });
        }
      },
      //Editing TypeOfWork
      editTypeOfWork: async (id:number,typeOfWork: TypeOfWorkAdded) => {
        set({ loading: true, error: null });
        try {
          const res = await apiTypeOfWork.patch(`/${id}`, typeOfWork);
          if (res.status != 201) { alert("not added") }

        } catch (err: any) {
          set({
            error: err.response?.data?.message || 'Error Loading Materials',
            loading: false,
          });
        }
      },
      //Editing TypeOfOwnering
      editTypeOfOwnering: async (id :number,typeOfOwnering: TypeOfOwneringAdded) => {
        set({ loading: true, error: null });
        try {
          const res = await apiTypeOfOwnering.patch(`/${id}`, typeOfOwnering);
          if (res.status != 201) { alert("not added") }

        } catch (err: any) {
          set({
            error: err.response?.data?.message || 'Error Loading Materials',
            loading: false,
          });
        }
      },
      //Adding New Property
      addProperty: async (property: Property | null) => {
        set({ loading: true, error: null });
        try {
          if (property !== null) {
            const { authData } = useAuthStore.getState(); // ✅ dynamically get latest auth data
            property.customerId = authData?.id || 0;
            console.log("added", property)
            const res = await apiProperty.post(``, property);
            set({ loading: false });
            if (res.status == 201) {
              alert("Offer Added")
            }
          }
        } catch (err: any) {
          set({
            error: err.response?.data?.message || 'Error Loading Properties',
            loading: false,
          });
        }
      },
      //Adding New Type of Property to the DB
      addTypeOfProperty: async (typeOfProperty: TypeOfPropertyAdded) => {
        set({ loading: true, error: null });
        try {
          const res = await apiTypeOfProperty.post(``, typeOfProperty);
          if (res.status != 201) { alert("not added") }

        } catch (err: any) {
          set({
            error: err.response?.data?.message || 'Error Loading Materials',
            loading: false,
          });
        }
      },

      //Adding New Type of Ownering to the DB
      addTypeOfOwnering: async (typeOFOwnering: TypeOfOwneringAdded) => {
        set({ loading: true, error: null });
        try {
          const res = await apiTypeOfOwnering.post(``, typeOFOwnering);
          if (res.status != 201) { alert("not added") }

        } catch (err: any) {
          set({
            error: err.response?.data?.message || 'Error Loading Materials',
            loading: false,
          });
        }
      },

      //Adding New Type of Work to the DB
      addTypeOfWork: async (typeOfWork: TypeOfWorkAdded) => {
        set({ loading: true, error: null });
        try {
          const res = await apiTypeOfWork.post(``, typeOfWork);
          if (res.status != 201) { alert("not added") }

        } catch (err: any) {
          set({
            error: err.response?.data?.message || 'Error Loading Materials',
            loading: false,
          });
        }
      },

    }),
    {
      name: 'properties-data-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ data: state.dataProperties })
    } // AsyncStorage (React Native)
  )
);
