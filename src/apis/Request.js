import axios from 'axios/index';
import databaseServer from './databaseServer';

class Request {
    constructor() {
        this.api = axios.create({
            baseURL: databaseServer.serverlink,
            timeout: databaseServer.timeout,
            headers: {
                "Content-Type": "application/json"
            },
        });
    }

    debugit() {
        this.api.interceptors.request.use((request) => {
          console.log("Starting Request", request);
          return request;
        });
    
        this.api.interceptors.response.use((response) => {
          console.log("Response:", response);
          return response;
        });
    }

    async signup(data) {
        const link = "/api/register";
        return await this.api.post(link, data);
    }

    async login(data) {
        const link = "/api/login";
        return await this.api.post(link, data);
    }

    async get(path) {
        const link = "/api/" + path;
        return await this.api.get(link, path);
    }

    async addAppointment(data) {
        const link = "/api/addappointment/";
        return await this.api.post(link, data);
    }

    async deleteAppointment(data) {
        const link = "/api/deleteappointment/";
        return await this.api.post(link, data);
    }

    async getAppointments(data) {
        const link = "/api/list/appointment/";
        return await this.api.post(link, data);
    }

    async getById(id) {
        const link = "/api/specializations/doctor/" + id;
        return await this.api.get(link, id);
    }

    async getDate(data) {
        const link = "/api/getdate";
        return await this.api.post(link, data);
    }

    async getTime(data) {
        const link = "/api/gettime";
        return await this.api.post(link, data);
    }

    async takeAppointment(data) {
        const link = "/api/takeappointment";
        return await this.api.post(link, data);
    }

    async getTakedAppointments(data) {
        const link = "/api/gettakedappointment/";
        return await this.api.post(link, data);
    }

    async searchSpecialization(key) {
        const link = "/api/specializations/search/" + key;
        return await this.api.get(link, key);
    }

    async joinRoom(data) {
        const link = "/api/joinRoom/";
        return await this.api.post(link, data);
    }

    async sendMessage(data) {
        const link = "/api/sendMessage";
        return await this.api.post(link, data);
    }

    async listMessages(data) {
        const link = "/api/messages/list/";
        return await this.api.post(link, data);
    }
}

export default Request;