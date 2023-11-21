import axios from 'axios';
import BASE_URL from '../config.js';

const getTasksReq = async () => {
    const url = `${BASE_URL}/tasks`;
    try {
        const response = await axios.get(url);
        return response.data;
    }catch (err) {
        console.error(`Error getting tasks: ${err.message}`);
        throw new Error('Failed to fetch tasks. Please check your internet connection and try again later.');
    }
};

const getTaskReq = async (id) => {
    const url = `${BASE_URL}/tasks/${id}`;
    try {
        const response = await axios.get(url);
        return response.data;
    }catch (err) {
        console.error(`Error getting task: ${err.message}`);
        throw new Error('Failed to fetch task. Please check your internet connection and try again later.');
    }
};

const createTasksReq = async (fields) => {
    const url = `${BASE_URL}/tasks`;
    try {
        const response = await axios.post(url,fields);
        //console.log(response.data);
        return response.data;
    }catch (err) {
        console.error(`Error inserting tasks: ${err.message}`);
        throw new Error('Failed to insert tasks. Please check your internet connection and try again later.');
    }
};

const updateTasksReq = async (id, fields) => {
    const url = `${BASE_URL}/tasks/${id}`;
    try {
        const response = await axios.put(url,fields);
        //console.log(response.data);
        return response.data;
    }catch (err) {
        console.error(`Error updating tasks: ${err.message}`);
        throw new Error('Failed to update tasks. Please check your internet connection and try again later.');
    }
};

const deleteTasksReq = async (id, fields) => {
    const url = `${BASE_URL}/tasks/${id}`;
    try {
        const response = await axios.delete(url);
        //console.log(response.data);
        return response.data;
    }catch (err) {
        console.error(`Error deleting tasks: ${err.message}`);
        throw new Error('Failed to delete tasks. Please check your internet connection and try again later.');
    }
};

export { getTasksReq, getTaskReq, createTasksReq, updateTasksReq,deleteTasksReq}