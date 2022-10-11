import axiosService from './axiosService';
import ApiRouteConfig from "configs/ApiRouteConfig";

class AuthService {
    private static _instance: AuthService;
    private _loginState: boolean = false;
    private constructor() {
        const token = localStorage.getItem('token');
        if(token) {
            axiosService.setAuthToken(token);
        }
     }

    public async loginUser(email: string, password: string) {
        try {
            const response = await axiosService.authpost(ApiRouteConfig.authLoginRoute, { email, password });
            const status = response?.status;
            if (status === 200) {
                this._loginState = true;
                 if (response?.data?.key) {
                    axiosService.setAuthToken(response.data.key);
                    axiosService.setUserEmail(email);
                    localStorage.setItem('token', response.data.key);
                }
            } else {
                this._loginState = false;
            }
        }
        catch (e: any) {
            this._loginState = false;
        }
        return this._loginState;
    }

    public async getUserType(email: string) {
        let userType = '';
        try {
            const response = await axiosService.get(ApiRouteConfig.userListRoute);
            // console.log(response.data);
            const user = response.data.filter((item: any) => {
                return item.email === email;
            });
            userType = user[0]?.user_type;
        }
        catch (e: any) {
            console.log(e);
        }
        return userType;
    }

    public async logoutUser() {
        axiosService.deleteUserEmail();
        axiosService.deleteAuthToken();
        this._loginState = false;
    }

    public static get Instance() {
        return this._instance || (this._instance = new this());
    }
}

const authService = AuthService.Instance;
export default authService;