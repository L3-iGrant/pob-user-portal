import axios from "axios";
import { API_BASE_URL } from "../configs/AppConfig";

const http = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-type': 'application/json',
    }
});

class AxiosService {
    private static _instance: AxiosService;
    private _config: any = {};
    private constructor() { }

    public setUserEmail(email: string) {
        window.sessionStorage.setItem('userEmail', email);
    }

    public deleteUserEmail() {
        window.sessionStorage.removeItem('userEmail')
    }

    public getUserEmail() {
        return window.sessionStorage.getItem('userEmail');
    }

    public setAuthToken(authToken: string) {
        window.sessionStorage.setItem('authToken', authToken);
        // Check if it's a Keycloak token (JWT format)
        const isKeycloakToken = this.isJwtToken(authToken);

        // Set the appropriate authorization header prefix
        const prefix = isKeycloakToken ? 'Bearer' : 'Token';

        this._config = {
            headers: {
                'Authorization': `${prefix} ${authToken}`
            }
        };
    }

    private isJwtToken(token: string): boolean {
        // Simple check if token is in JWT format (three parts separated by dots)
        return token.split('.').length === 3;
    }

    public deleteAuthToken() {
        this._config = {
            headers: {}
        }
        window.sessionStorage.removeItem('authToken')
    }

    public getAuthToken() {
        return window.sessionStorage.getItem('authToken');
    }

    // public setRefreshToken(refreshToken: string) {
    //     this._refreshToken = refreshToken;
    //     localStorage.setItem('refreshToken', refreshToken);
    // }

    // public deleteRefreshToken() {
    //     this._refreshToken = undefined;
    //     localStorage.removeItem('refreshToken');
    // }

    public async get(route: string) {
        const response = await http.get(route, this._config);
        return response;
    }

    public async getDynamic(apiendpoint: string) {
        const httpDynamic = axios.create({
            headers: {
                'Content-type': 'application/json',
            },
        });
        const response = await httpDynamic.get(apiendpoint, this._config);
        return response;
    }

    public async post(route: string, data: any) {
        const response = await http.post(route, data, this._config);
        return response;
    }

    public async authpost(route: string, data: any) {
        const response = await http.post(route, data);
        return response;
    }

    public async put(route: string, data: any) {
        const response = await http.put(route, data, this._config);
        return response;
    }

    public async delete(route: string) {
        const response = await http.delete(route, this._config);
        return response;
    }

    public static get Instance() {
        return this._instance || (this._instance = new this());
    }
}

const axiosService = AxiosService.Instance;
export default axiosService;