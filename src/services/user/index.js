import instance from "@/lib/axios/instance";

export const revalidate = 0;
export const fetchCache = "force-no-store";

export const usersServices = {
 fetchAllUser: () => instance.get("/api/v1.0.0/users"),
 fetchDashboard: () => instance.get("/api/v1.0.0/dashboard"),
};
