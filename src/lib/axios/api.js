import useStore from '@/store/useStore';

export const useFetch = (endpoint, apiFunction) => {
  const { loading, response, setLoading, setResponse } = useStore();

  const fetchData = async () => {
    setLoading('fetch', endpoint, true);
    try {
      const result = await apiFunction();
      setResponse('fetch', endpoint, result.data);
    } catch (error) {
      console.error(`Error fetching data from ${endpoint}:`, error);
      setResponse('fetch', endpoint, null);
    } finally {
      setLoading('fetch', endpoint, false);
    }
  };

  return { loading: loading.fetch?.[endpoint], response: response.fetch?.[endpoint], fetchData };
};

export const useFetchById = (endpoint, apiFunction) => {
  const { loading, response, setLoading, setResponse } = useStore();

  const fetchDataById = async (id) => {
    setLoading('fetchById', endpoint, true);
    try {
      const result = await apiFunction(id);
      setResponse('fetchById', endpoint, result.data);
    } catch (error) {
      console.error(`Error fetching data from ${endpoint}/${id}:`, error);
      setResponse('fetchById', endpoint, null);
    } finally {
      setLoading('fetchById', endpoint, false);
    }
  };

  return {
    loading: loading.fetchById?.[endpoint],
    response: response.fetchById?.[endpoint],
    fetchDataById,
  };
};

export const useUpdate = (endpoint, apiFunction) => {
  const { loading, response, setLoading, setResponse } = useStore();

  const updateData = async (data) => {
    setLoading('update', endpoint, true);
    try {
      const result = await apiFunction(data);
      setResponse('update', endpoint, result.data);
    } catch (error) {
      console.error(`Error updating data at ${endpoint}:`, error);
      setResponse('update', endpoint, null);
    } finally {
      setLoading('update', endpoint, false);
    }
  };

  return { loading: loading.update?.[endpoint], response: response.update?.[endpoint], updateData };
};

export const useUpdateById = (endpoint, apiFunction) => {
  const { loading, response, setLoading, setResponse } = useStore();

  const updateDataById = async (id, data) => {
    setLoading('updateById', endpoint, true);
    try {
      const result = await apiFunction(id, data);
      setResponse('updateById', endpoint, result.data);
    } catch (error) {
      console.error(`Error updating data at ${endpoint}/${id}:`, error);
      setResponse('updateById', endpoint, null);
    } finally {
      setLoading('updateById', endpoint, false);
    }
  };

  return {
    loading: loading.updateById?.[endpoint],
    response: response.updateById?.[endpoint],
    updateDataById,
  };
};
export const useUpdateValidateById = (endpoint, apiFunction) => {
  const { loading, response, setLoading, setResponse } = useStore();

  const updateDataValidasiById = async (id, activity, data) => {
    setLoading('updateValidasiById', endpoint, true);
    try {
      const result = await apiFunction(id, activity, data);
      console.log(id, activity, data);
      setResponse('updateValidasiById', endpoint, result.data);
    } catch (error) {
      console.error(`Error updating data at ${endpoint}/${id}:`, error);
      setResponse('updateValidasiById', endpoint, null);
    } finally {
      setLoading('updateValidasiById', endpoint, false);
    }
  };

  return {
    loading: loading.updateValidasiById?.[endpoint],
    response: response.updateValidasiById?.[endpoint],
    updateDataValidasiById,
  };
};

export const useDelete = (endpoint, apiFunction) => {
  const { loading, response, setLoading, setResponse } = useStore();

  const deleteData = async (id) => {
    setLoading('delete', endpoint, true);
    try {
      const result = await apiFunction(id);
      setResponse('delete', endpoint, result.data);
    } catch (error) {
      console.error(`Error deleting data at ${endpoint}:`, error);
      setResponse('delete', endpoint, null);
    } finally {
      setLoading('delete', endpoint, false);
    }
  };

  return { loading: loading.delete?.[endpoint], response: response.delete?.[endpoint], deleteData };
};

export const usePost = (endpoint, apiFunction) => {
  const { loading, response, setLoading, setResponse } = useStore();

  const postData = async (data) => {
    setLoading('post', endpoint, true);
    try {
      const result = await apiFunction(data);
      console.log(result);
      setResponse('post', endpoint, result);
    } catch (error) {
      console.error(`Error posting data to ${endpoint}:`, error);
      setResponse('post', endpoint, null);
    } finally {
      setLoading('post', endpoint, false);
    }
  };

  return { loading: loading.post?.[endpoint], response: response.post?.[endpoint], postData };
};
