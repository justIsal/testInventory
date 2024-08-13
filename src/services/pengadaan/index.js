import instance from '@/lib/axios/instance';

export const revalidate = 0;
export const fetchCache = 'force-no-store';

export const pengadaanServices = {
  addPengadaan: (data) => instance.post('/api/v1.0.0/pengadaan', data),
  fetchAllPengadaan: () => instance.get('/api/v1.0.0/pengadaan'),
  fetchPengadaanById: (id) => instance.get('/api/v1.0.0/pengadaan/' + id),
  updatePengadaan: (id, data) => instance.get('/api/v1.0.0/pengadaan/' + id, data),
  deletePengadaan: (id) => instance.delete('/api/v1.0.0/pengadaan/' + id),
};
