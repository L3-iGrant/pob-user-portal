import axiosService from './axiosService';
import ApiRouteConfig from "configs/ApiRouteConfig";
import {ConnectionInvitation} from "../interfaces/connectioninvitation";

class CompanyService {
    private static _instance: CompanyService;
    private constructor() { }

    public async getCertificateSchemaIdByOrganisationId(organisationId: string) {
        let certificateSchemaIdList: any[] = [];
        try {
            const response = await axiosService.get(`${ApiRouteConfig.certificatesSchemaRoute}?organisation_id=${organisationId}`);
            certificateSchemaIdList = response.data.results.map((x: any) => x.schema_id);
        }
        catch (e: any) {
            console.log(e);
        }
        return certificateSchemaIdList;
    }

    public async getCertificateSchemaAttributeBySchemaIdAndOrganisationId(organisationId: string, schemaId: string) {
        let certificateSchemaAttribute: any = {};
        try {
            const response = await axiosService.get(`${ApiRouteConfig.certificatesSchemaAttributeRoute}?organisation_id=${organisationId}&schema_id=${schemaId}`);
            certificateSchemaAttribute = response.data.schema;
        }
        catch (e: any) {
            console.log(e);
        }
        return certificateSchemaAttribute;
    }

    public async submitCredentialRequest() {
        let submitCredentialRequestState: boolean = false;
        try {
            await axiosService.get(ApiRouteConfig.certificateRequestRoute);
            submitCredentialRequestState = true;
        }
        catch (e: any) {
            console.log(e);
        }
        return submitCredentialRequestState;
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

    public async getDefaultConnections() {
        try {
            const response = await axiosService.get(ApiRouteConfig.getDefaultConnection);
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

    public async checkCertificate(certificateID: string) {
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

    public async deleteCertificate(organisationId: string, referent: string) {
        try {
            await axiosService.delete(`${ApiRouteConfig.deleteCertificate}?organisation_id=${organisationId}&referent=${referent}`);
            return true;
        }
        catch (e: any) {
            console.log(e);
        }
        return false;
    }

    public async createInvitation() {
        let invitation: ConnectionInvitation = {};
        try {
            const response = await axiosService.post(ApiRouteConfig.createInvitation, null);
            const status = response?.status;
            if (status === 200) {
                invitation = response.data;
            }
        }
        catch (e: any) {
            console.log(e);
        }
        return invitation;
    }


    public static get Instance() {
        return this._instance || (this._instance = new this());
    }
}

const companyService = CompanyService.Instance;
export default companyService;