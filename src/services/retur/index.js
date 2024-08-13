import instance from "@/lib/axios/instance";

export const revalidate = 0;
export const fetchCache = "force-no-store";

export const returServices = {
 addRetur: (data) => instance.post("/api/v1.0.0/retur", data),
 fetchAllRetur: () => instance.get("/api/v1.0.0/retur"),
 fetchReturById: (id) => instance.get("/api/v1.0.0/retur/" + id),
 updateRetur: (id, data) => instance.get("/api/v1.0.0/retur/" + id, data),
 deleteRetur: (id) => instance.delete("/api/v1.0.0/retur/" + id),
};
