import instance from "@/lib/axios/instance";

export const revalidate = 0;
export const fetchCache = "force-no-store";

export const permintaanServices = {
 addPermintaan: (data) => instance.post("/api/v1.0.0/permintaan", data),
 fetchAllpermintaan: () => instance.get("/api/v1.0.0/permintaan"),
 fetchPermintaanById: (id) => instance.get("/api/v1.0.0/permintaan/" + id),
 updatePermintaan: (id, data) =>
  instance.get("/api/v1.0.0/permintaan/" + id, data),
 deletePermintaan: (id) => instance.delete("/api/v1.0.0/permintaan/" + id),
 fetchFifo: () => instance.get("/api/v1.0.0/fifo"),
};
