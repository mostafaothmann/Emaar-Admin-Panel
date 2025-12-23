import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { apiMaterial, apiTypeOfMaterial } from '../api';


// 🧩 Interfaces
export interface Material {
  id: number;
  companyPhone: number;
  companyWhatsapp: number;
  description: string,
  TypeOfMaterialid: number,
  Companyid: number,
  price_for_one: number,
  isActive: number,
  type: string,
}

export interface TypeOfMaterial {
  id: number;
  name: string;
  description: string;
}
export interface TypeOfMaterialAdded {
  name: string;
  description: string;
}
interface DataStore {
  dataMaterials: Material[] | undefined;
  dataTypeOfMaterials: TypeOfMaterial[] | undefined;
  dataTypeOfMaterial: TypeOfMaterial | undefined;

  loading: boolean;
  materialD: Material,
  error: string | null;
  getMaterialsData: () => Promise<void>;
  addTypeOfMaterial: (typOfMAterial: TypeOfMaterialAdded) => Promise<void>;
  getMaterialData: (id: number) => Promise<void>;
  getTypeOfMaterial: () => Promise<void>;
  deleteTypeOfMaterial: (id: number) => Promise<void>;
  deleteMaterial: (id: number) => Promise<void>;
  editTypeOfMaterial: (id: number, typeOfMaterial: TypeOfMaterialAdded) => Promise<void>;
}
//gettig the token from Auth Store 
export const useMaterialesDataStore = create<DataStore>()(
  persist(
    (set, get) => ({
      dataMaterials: undefined,
      dataTypeOfMaterial: undefined,
      dataTypeOfMaterials: undefined,
      materialD: Object(),
      loading: false,
      error: null,
      // Get Materials Data
      getMaterialsData: async () => {
        set({ loading: true, error: null });
        try {
          const res = await apiMaterial.get(``);
          const dataMaterials = res.data
          set({ dataMaterials, loading: false });
          return dataMaterials
        } catch (err: any) {
          set({
            error: err.response?.data?.message || 'Error Loading Materials',
            loading: false,
          });
        }
      },
      // Get Types of Materials Data
      getTypeOfMaterial: async () => {
        set({ loading: true, error: null });
        try {
          const res = await apiTypeOfMaterial.get(``);
          const dataTypeOfMaterials = res.data
          set({ dataTypeOfMaterials, loading: false });
          return dataTypeOfMaterials
        } catch (err: any) {
          set({
            error: err.response?.data?.message || 'Error Loading Materials',
            loading: false,
          });
        }
      },

      //getAll Materials 👈 used in CustomerMaterials,
      getMaterialData: async (id: number) => {
        set({ loading: true, error: null });
        try {
          const res = await apiMaterial.get(`/${id}`);
          const materialD = res.data
          set({ materialD, loading: false });
          return materialD
        } catch (err: any) {
          set({
            error: err.response?.data?.message || 'Error Loading Materials',
            loading: false,
          });
        }
      },
      //Adding New Type of Material to the DB
      addTypeOfMaterial: async (typeOFMaterial: TypeOfMaterialAdded) => {
        set({ loading: true, error: null });
        try {
          const res = await apiTypeOfMaterial.post(``, typeOFMaterial);
          if (res.status != 201) { alert("not added") }

        } catch (err: any) {
          set({
            error: err.response?.data?.message || 'Error Loading Materials',
            loading: false,
          });
        }
      },
      //Deleting Material
      deleteMaterial: async (id: number) => {
        set({ loading: true, error: null });
        try {
          const res = await apiMaterial.delete(`/${id}`);
          if (res.status == 201)
            alert("deleted")
        } catch (err: any) {
          set({
            error: err.response?.data?.message || 'Error Loading Properties',
            loading: false,
          });
        }
      },
      //Deleting Type Of Material
      deleteTypeOfMaterial: async (id: number) => {
        set({ loading: true, error: null });
        try {
          const res = await apiTypeOfMaterial.delete(`/${id}`);
          if (res.status == 201)
            alert("deleted")
        } catch (err: any) {
          set({
            error: err.response?.data?.message || 'Error Loading Properties',
            loading: false,
          });
        }
      },
      //Editing Type Of Material
      //Deleting Type Of Material
      editTypeOfMaterial: async (id: number, typeOfMaterial: TypeOfMaterialAdded) => {
        set({ loading: true, error: null });
        try {
          const res = await apiTypeOfMaterial.patch(`/${id}`, typeOfMaterial);
          if (res.status == 201)
            alert("edited")
        } catch (err: any) {
          set({
            error: err.response?.data?.message || 'Error Loading Properties',
            loading: false,
          });
        }
      },
    }),
    {
      name: 'materiales-data-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ data: state.dataMaterials })
    }
  )
);
