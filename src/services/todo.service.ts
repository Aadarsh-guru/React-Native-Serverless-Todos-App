import axios from "axios";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export const createTodoService = async (text: string) => {
    try {
        const response = await axios.post(`${API_URL}/api/v1/todos/create-todo`, { content: text });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getTodosService = async () => {
    try {
        const response = await axios.get(`${API_URL}/api/v1/todos/get-todos`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateTodoService = async (id: string, text: string) => {
    try {
        const response = await axios.put(`${API_URL}/api/v1/todos/update-todo/${id}`, { content: text });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteTodoService = async (id: string) => {
    try {
        const response = await axios.delete(`${API_URL}/api/v1/todos/delete-todo/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};