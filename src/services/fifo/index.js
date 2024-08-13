import instance from "@/lib/axios/instance";

export const revalidate = 0;
export const fetchCache = "force-no-store";

export const fifoServices = {
 fetchFifoByTipe: () => instance.get("/api/v1.0.0/fifo/tipe"),
 fetchFifoByMerek: () => instance.get("/api/v1.0.0/fifo/merek"),
};
