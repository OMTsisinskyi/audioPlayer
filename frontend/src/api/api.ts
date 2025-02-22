import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

const routes = {
    saveRecording: '/media/save',
    getAllRecordings: '/media/get-all',
    deleteRecording: '/media/delete',
    updateRecording: '/media/update',
};

export const saveRecording = async (formData: FormData) => {
    try {
        const response = await api.post(routes.saveRecording, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response;
    } catch (error) {
        console.error("Error saving recording:", error);
        throw error;
    }
};

export const getAllRecordings = async () => {
    try {
        const response = await api.get(routes.getAllRecordings);
        return response.data;
    } catch (error) {
        console.error("Error fetching recordings:", error);
        throw error;
    }
};

export const deleteRecording = async (id: string) => {
    try {
        const response = await api.delete(`${routes.deleteRecording}/${id}`);
        return response
    } catch (error) {
        console.error("Error deleting recording:", error);
        throw error;
    }
};

export const getMediaData = async (mediaId: string) => {
    try {
        const response = await api.get(`/media/data/${mediaId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching media file:", error);
        throw error;
    }
};

export const getMediaFile = async (mediaId: string) => {
    try {
        const response = await api.get(`/media/${mediaId}`, {
            responseType: 'arraybuffer',
        });


        return response.data;
    } catch (error) {
        console.error("Error fetching media file:", error);
        throw error;
    }
};

export const updateRecording = async (id: string, data: { title: string; description: string }) => {
    try {
        const response = await api.put(`${routes.updateRecording}/${id}`, data);
        return response;
    } catch (error) {
        console.error("Error updating recording:", error);
        throw error;
    }
};
