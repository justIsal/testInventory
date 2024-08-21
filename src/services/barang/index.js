import instance from "@/lib/axios/instance";

export const revalidate = 0;
export const fetchCache = "force-no-store";

export const barangServices = {
 addBarang: (data) => instance.get("/api/v1.0.0/barang", data),
 fetchAllBarang: () => instance.get("/api/v1.0.0/barang"),
 fetchBarangById: (id) => instance.get("/api/v1.0.0/barang/" + id),
 fetchBarangKode: () => instance.get("/api/v1.0.0/barang/kode"),
 updateBarang: (id, data) => instance.get("/api/v1.0.0/barang/" + id, data),
 deleteBarang: (id) => instance.delete("/api/v1.0.0/barang/" + id),
 fetchLog: (i) => instance.get("/api/v1.0.0/log/"),
 fethLogById: (id) => instance.delete("/api/v1.0.0/log/" + id),
 updateActivityById: (id, activity, data) =>
  instance.put(`/api/v1.0.0/${activity}/${id}/validasi/`, data),
};
