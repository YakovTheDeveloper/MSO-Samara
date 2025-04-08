import axios from "axios";

const apiClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}api/`
});

apiClient.interceptors.response.use(
    (response) => {
        return { isError: false, data: response.data };
    },
    (error) => {
        return Promise.resolve({
            isError: true,
            status: error.response?.data?.status || -1,
            description: error.response?.data?.message || error.message || "An unknown error occurred",
        });
    }
);

export default apiClient;