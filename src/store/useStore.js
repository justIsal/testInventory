import {create} from "zustand";

export const revalidate = 0;
export const fetchCache = "force-no-store";

const useStore = create((set) => ({
 loading: {},
 response: {},
 setLoading: (operation, endpoint, loading) =>
  set((state) => ({
   loading: {
    ...state.loading,
    [operation]: {...state.loading[operation], [endpoint]: loading},
   },
  })),
 setResponse: (operation, endpoint, response) =>
  set((state) => ({
   response: {
    ...state.response,
    [operation]: {...state.response[operation], [endpoint]: response},
   },
  })),
}));

export default useStore;
