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

    public async getConnections() {
        try {
            const response = await axiosService.get(ApiRouteConfig.getConnection);
            const status = response?.status;
            if (status === 200) {
                return response.data
            }
            return null;
        }
        catch (e: any) {
            console.log(e);
        }
        return null;
    }

    public async getCertificates() {
        try {
            const response = await axiosService.get(ApiRouteConfig.getCertificates);
            const status = response?.status;
            if (status === 200) {
                return response.data
            }
            return null;
        }
        catch (e: any) {
            console.log(e);
        }
        return null;
    }

    public async checkCertificate(certificateID:string) {
        try {
            const response = await axiosService.get(ApiRouteConfig.checkCertificate + 
                '?credential_exchange_id=' + certificateID);
            const status = response?.status;
            if (status === 200) {
                return response.data
            }
            return null;
        }
        catch (e: any) {
            console.log(e);
        }
        return null;
    }

    public async requestCertificate() {
        try {
            const response = await axiosService.get(ApiRouteConfig.requestCertificate);
            const status = response?.status;
            if (status === 200) {
                return response.data
            }
            return null;
        }
        catch (e: any) {
            console.log(e);
        }
        return null;
    }

    public static get Instance() {
        return this._instance || (this._instance = new this());
    }
}

const companyService = CompanyService.Instance;
export default companyService;