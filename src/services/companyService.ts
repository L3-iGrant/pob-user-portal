import axiosService from './axiosService';
import ApiRouteConfig from "configs/ApiRouteConfig";

class CompanyService {
    private static _instance: CompanyService;
    private constructor() { }

    public async acceptInvitation(invitationUrl: string) {
        let invitationAccepted = false;
        try {
            const response = await axiosService.post(ApiRouteConfig.acceptInvitation, {
                'connection_url': invitationUrl,
            });
            const status = response?.status;
            if (status === 200) {
                invitationAccepted = true;
            }
        }
        catch (e: any) {
            console.log(e);
        }
        return invitationAccepted;
    }

    public static get Instance() {
        return this._instance || (this._instance = new this());
    }
}

const companyService = CompanyService.Instance;
export default companyService;