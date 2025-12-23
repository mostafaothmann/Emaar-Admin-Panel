// api.ts
import axios from 'axios';
import { useAuthStore } from './customersStore/auth.store';
const url =`https://emaarbackend-production.up.railway.app`
export const apiCustomer = axios.create({
  baseURL: `${url}/customer`,
  headers: { 'Content-Type': 'application/json' },
});

// 🧠 Automatically attach the latest token before each request
apiCustomer.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().authData?.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      delete config.headers.Authorization;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


export const apiCPO = axios.create({
  baseURL: `${url}/customer-property-offer`,
  headers: { 'Content-Type': 'application/json' },
});

// 🧠 Automatically attach the latest token before each request
apiCPO.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().authData?.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      delete config.headers.Authorization;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


export const apiProperty = axios.create({
  baseURL: `${url}/property`,
  headers: { 'Content-Type': 'application/json' },
});

// 🧠 Automatically attach the latest token before each request
apiProperty.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().authData?.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      delete config.headers.Authorization;
    }
    return config;
  },
  (error) => Promise.reject(error)
);



export const apiMaterial = axios.create({
  baseURL: `${url}/material`,
  headers: { 'Content-Type': 'application/json' },
});

// 🧠 Automatically attach the latest token before each request
apiMaterial.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().authData?.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      delete config.headers.Authorization;
    }
    return config;
  },
  (error) => Promise.reject(error)
);



export const apiTypeOfProperty = axios.create({
  baseURL: `${url}/typeofproperty`,
  headers: { 'Content-Type': 'application/json' },
});

// 🧠 Automatically attach the latest token before each request
apiTypeOfProperty.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().authData?.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      delete config.headers.Authorization;
    }
    return config;
  },
  (error) => Promise.reject(error)
);




export const apiTypeOfOwnering = axios.create({
  baseURL: `${url}/typeofownering`,
  headers: { 'Content-Type': 'application/json' },
});

// 🧠 Automatically attach the latest token before each request
apiTypeOfOwnering.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().authData?.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      delete config.headers.Authorization;
    }
    return config;
  },
  (error) => Promise.reject(error)
);





export const apiTypeOfWork = axios.create({
  baseURL: `${url}/typeofwork`,
  headers: { 'Content-Type': 'application/json' },
});
// 🧠 Automatically attach the latest token before each request
apiTypeOfWork.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().authData?.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      delete config.headers.Authorization;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const apiCompany = axios.create({
  baseURL: `${url}/company`,
  headers: { 'Content-Type': 'application/json' },
});

// 🧠 Automatically attach the latest token before each request
apiProperty.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().authData?.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      delete config.headers.Authorization;
    }
    return config;
  },
  (error) => Promise.reject(error)
);



export const apiTypeOfMaterial = axios.create({
  baseURL: `${url}/typeofmaterial`,
  headers: { 'Content-Type': 'application/json' },
});

// 🧠 Automatically attach the latest token before each request
apiTypeOfMaterial.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().authData?.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      delete config.headers.Authorization;
    }
    return config;
  },
  (error) => Promise.reject(error)
);



export const apiTypeOfCompany = axios.create({
  baseURL: `${url}/typeofcompany`,
  headers: { 'Content-Type': 'application/json' },
});

// 🧠 Automatically attach the latest token before each request
apiTypeOfCompany.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().authData?.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      delete config.headers.Authorization;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

