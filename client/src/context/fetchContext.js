import React, { createContext, useEffect } from 'react';
import { authAxios } from '../utils/authFetch';

const FetchContext = createContext();
const { Provider } = FetchContext;
function FetchProvider({ children }) {
  useEffect(() => {
    const getCsrfToken = async () => {
      const { data } = await authAxios.get('/users/csrf-token');
      authAxios.defaults.headers['X-CSRF-Token'] = data.csrfToken;
    };
    getCsrfToken();
  }, []);

  // authAxios.interceptors.response.use(
  //   (response) => {
  //     return response;
  //   },
  //   (error) => {
  //     const code = error && error.response ? error.response.status : 0;
  //     if (code === 401 || code === 403) {
  //       console.log('error-code', code);
  //     }
  //     return Promise.reject(error);
  //   }
  // );
  return <Provider value={{ authAxios }}>{children}</Provider>;
}

export { FetchProvider, FetchContext };
