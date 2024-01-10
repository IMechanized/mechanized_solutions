import { authAxios } from "../utils/axiosKits";

authAxios.interceptors.request.use((config) => {
    const localData = localStorage.getItem("UserData");
    const token = JSON.parse(localData);
    config.headers.Authorization = `Bearer ${token.accessToken}`;
    return config;
});

export default async function fetcher() {
    // sleep 400
    await new Promise((resolve) => setTimeout(resolve, 400));
    const localData = localStorage.getItem("UserData");
    if (localData) {
        // user logged in fetch user data
        const { data, error } = await authAxios.get(`/user/self`);

        return {
            data: data,
            error: error,
        };
    }
    return {
        data: null,
        error: {
            message: 403,
        },
    };
}