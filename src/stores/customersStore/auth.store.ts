import { create } from 'zustand';
import axios from 'axios';
import { persist, createJSONStorage } from 'zustand/middleware';


// 🧩 Interfaces
interface Auth {
  id:number;
  email: string;
  password: string;
  token?: string;
  role:string;
}
export interface Customer{
  firstName:string;
  lastName:string;
  email:string;
  password:string;
  age:number;
  phone:number;
}

interface AuthStore {
  authData: Auth | null;
  loading: boolean;
  signedIn:boolean|false;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  getToken: () =>string |null; 
}

//create axios instance
const url =`https://emaarbackend-production.up.railway.app`

const api = axios.create({
  baseURL: `${url}/auth/`, // 🔁 change to your backend URL
  headers: { 'Content-Type': 'application/json' },
});

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      authData: null,
      loading: false,
      error: null,
      signedIn:false,
      
      // Login
      login: async (email: string, password: string) => {
        set({ loading: true, error: null });

        try {
          const res = await api.post('Customer/login', {email,password});
          const token = res.data?.accessToken; // expected response { accessToken, ... }
          const role  = res.data?.role;
          const id   = res.data?.id
          const error =res.data?.error
          const authData: Auth = { email, password, token,role ,id};
          set({ authData, loading: false,signedIn:true });
          //set token globally in axios for Authorization
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } catch (err: any) {
          set({
            error: err.response?.data?.message || 'Login failed',
            loading: false,
          });
        }
      },
      //Logout
      logout: () => {
        set({ authData: null });
        set({ signedIn: false })
        delete api.defaults.headers.common['Authorization'];
      },
      //Get token (useful for requests)
      getToken: () => {
       const { authData } = get();
        if (authData?.token)
        return authData.token ;
        else 
        return null
      },
    }),
    {name: 'customer-auth-storage',
  //  storage: createJSONStorage(() => AsyncStorage),
   // partialize: (state) => ({ authData: state.authData })
    } // AsyncStorage (React Native)
  )
);
