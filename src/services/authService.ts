import axiosService from './axiosService';
import ApiRouteConfig from "configs/ApiRouteConfig";

class AuthService {
    private static _instance: AuthService;
    private _loginState: boolean = false;
    private _groups: Array<any> = [];
    private _permissions: Array<any> = [];
    private constructor() { }

    public async loginUser(email: string, password: string) {
        try {
            const response = await axiosService.authpost(ApiRouteConfig.authLoginRoute, { email, password });
            if (response.data.key) {
                axiosService.setAuthToken(response.data.key);
                axiosService.setUserEmail(email);
            }
            const status = response?.status;
            if (status === 200) {
                this._loginState = true;
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

    // public async refreshUserAccess() {
    //     try {
    //         const refreshToken = localStorage.getItem('refreshToken');
    //         const response = await axiosService.post(ApiRouteConfig.authRefreshTokenRoute, { "refresh": refreshToken });
    //         if (response.data.access) {
    //             axiosService.setAuthToken(response.data.access);
    //         }
    //         this._loginState = true;
    //     }
    //     catch (e: any) {
    //         this._loginState = false;
    //     }
    //     return this._loginState;
    // }

    // public async getMyPermissions() {
    //     try {
    //         const response = await axiosService.get(ApiRouteConfig.authMyPermissionsRoute);
    //         this._groups = response.data.groups;
    //         const groupsResponse = await this.getUserGroups(1, 10000);
    //         const tempPermissionArray: Array<any> = [];
    //         this._groups.forEach((groupItem) => {
    //             for (let i = 0; i < groupsResponse.userGroupsList.length; i++) {
    //                 if (groupItem.id === groupsResponse.userGroupsList[i].id) {
    //                     tempPermissionArray.push(groupsResponse.userGroupsList[i].roles);
    //                     break;
    //                 }
    //             }
    //         });
    //         this._permissions = tempPermissionArray;
    //     }
    //     catch (e: any) {
    //         this._permissions = [];
    //     }
    //     return this._permissions;
    // }

    // public myPermission(content_type: string) {
    //     const permission: Array<any> = [];
    //     try {
    //         this._permissions.forEach((permissionItem) => {
    //             permission.push(permissionItem.filter((item: any) => { return item.content_type === content_type; }));
    //         });
    //     }
    //     catch (e: any) {
    //         console.log(e);
    //     }
    //     return permission;
    // }

    // public applyNavigationPermission = async (navigationConfig: any[]) => {
    //     let permissionObject: any = {};
    //     const navigationOptions = ['user', 'dashboard', 'report', 'roles', 'group', 'device', 'devicetype', 'logentry', 'reporthistory'];
    //     const navigationPermissionPromise = navigationOptions.map((item) => {
    //         return this.myPermission(item);
    //     });
    //     const response: any[] = await Promise.all(navigationPermissionPromise);
    //     response.forEach((item: any[], index: number) => {
    //         permissionObject[navigationOptions[index]] = this.readAllowed(item);
    //     });
    //     return this.updateNavigation(navigationConfig, permissionObject);
    // }

    // public updateNavigation = (navigationConfig: any[], permissionObject: any) => {
    //     const tempNavigationConfig = navigationConfig;
    //     try {
    //         if (!permissionObject['user'] && !permissionObject['roles'] && !permissionObject['group'] && !permissionObject['logentry']) {
    //             tempNavigationConfig[0].submenu = tempNavigationConfig[0].submenu.filter((obj: { key: any; }) => obj.key !== 'manage-users');
    //         }
    //         else {
    //             if (!permissionObject['user']) {
    //                 const submenuItem = tempNavigationConfig[0].submenu.filter((obj: { key: any; }) => obj.key === 'manage-users');
    //                 submenuItem[0].submenu = submenuItem[0].submenu.filter((obj: { key: any; }) => obj.key !== 'manage-users-list');
    //             }
    //             if (!permissionObject['roles']) {
    //                 const submenuItem = tempNavigationConfig[0].submenu.filter((obj: { key: any; }) => obj.key === 'manage-users');
    //                 submenuItem[0].submenu = submenuItem[0].submenu.filter((obj: { key: any; }) => obj.key !== 'manage-user-roles-list');
    //             }
    //             if (!permissionObject['group']) {
    //                 const submenuItem = tempNavigationConfig[0].submenu.filter((obj: { key: any; }) => obj.key === 'manage-users');
    //                 submenuItem[0].submenu = submenuItem[0].submenu.filter((obj: { key: any; }) => obj.key !== 'manage-user-groups-list');
    //             }
    //             if (!permissionObject['logentry']) {
    //                 const submenuItem = tempNavigationConfig[0].submenu.filter((obj: { key: any; }) => obj.key === 'manage-users');
    //                 submenuItem[0].submenu = submenuItem[0].submenu.filter((obj: { key: any; }) => obj.key !== 'manage-user-audit-logs');
    //             }
    //         }

    //         if (!permissionObject['device'] && !permissionObject['devicetype'] && !permissionObject['logentry']) {
    //             tempNavigationConfig[0].submenu = tempNavigationConfig[0].submenu.filter((obj: { key: any; }) => obj.key !== 'manage-devices');
    //         }
    //         else {
    //             if (!permissionObject['device']) {
    //                 const submenuItem = tempNavigationConfig[0].submenu.filter((obj: { key: any; }) => obj.key === 'manage-devices');
    //                 submenuItem[0].submenu = submenuItem[0].submenu.filter((obj: { key: any; }) => obj.key !== 'manage-device-list');
    //             }
    //             if (!permissionObject['devicetype']) {
    //                 const submenuItem = tempNavigationConfig[0].submenu.filter((obj: { key: any; }) => obj.key === 'manage-devices');
    //                 submenuItem[0].submenu = submenuItem[0].submenu.filter((obj: { key: any; }) => obj.key !== 'manage-device-type-list');
    //             }
    //             if (!permissionObject['logentry']) {
    //                 const submenuItem = tempNavigationConfig[0].submenu.filter((obj: { key: any; }) => obj.key === 'manage-devices');
    //                 submenuItem[0].submenu = submenuItem[0].submenu.filter((obj: { key: any; }) => obj.key !== 'manage-device-type-audit-logs');
    //             }
    //             if (!permissionObject['logentry']) {
    //                 const submenuItem = tempNavigationConfig[0].submenu.filter((obj: { key: any; }) => obj.key === 'manage-devices');
    //                 submenuItem[0].submenu = submenuItem[0].submenu.filter((obj: { key: any; }) => obj.key !== 'manage-device-audit-logs');
    //             }
    //         }

    //         if (!permissionObject['report'] && !permissionObject['logentry']) {
    //             tempNavigationConfig[0].submenu = tempNavigationConfig[0].submenu.filter((obj: { key: any; }) => obj.key !== 'manage-reports');
    //         }
    //         else {
    //             if (!permissionObject['report']) {
    //                 const submenuItem = tempNavigationConfig[0].submenu.filter((obj: { key: any; }) => obj.key === 'manage-reports');
    //                 submenuItem[0].submenu = submenuItem[0].submenu.filter((obj: { key: any; }) => obj.key !== 'report-list');
    //             }
    //             if (!permissionObject['logentry']) {
    //                 const submenuItem = tempNavigationConfig[0].submenu.filter((obj: { key: any; }) => obj.key === 'manage-reports');
    //                 submenuItem[0].submenu = submenuItem[0].submenu.filter((obj: { key: any; }) => obj.key !== 'manage-report-audit-logs');
    //             }
    //         }

    //         if (!permissionObject['dashboard'] && !permissionObject['logentry']) {
    //             tempNavigationConfig[0].submenu = tempNavigationConfig[0].submenu.filter((obj: { key: any; }) => obj.key !== 'manage-dashboards');
    //         }
    //         else {
    //             if (!permissionObject['dashboard']) {
    //                 const submenuItem = tempNavigationConfig[0].submenu.filter((obj: { key: any; }) => obj.key === 'manage-dashboards');
    //                 submenuItem[0].submenu = submenuItem[0].submenu.filter((obj: { key: any; }) => obj.key !== 'dashboard-list');
    //             }
    //             if (!permissionObject['logentry']) {
    //                 const submenuItem = tempNavigationConfig[0].submenu.filter((obj: { key: any; }) => obj.key === 'manage-dashboards');
    //                 submenuItem[0].submenu = submenuItem[0].submenu.filter((obj: { key: any; }) => obj.key !== 'manage-dashboard-audit-logs');
    //             }
    //         }
    //         if (!permissionObject['dashboard']) {
    //             tempNavigationConfig[0].submenu = tempNavigationConfig[0].submenu.filter((obj: { key: any; }) => obj.key !== 'dashboard');
    //         }
    //         if (!permissionObject['reporthistory']) {
    //             tempNavigationConfig[0].submenu = tempNavigationConfig[0].submenu.filter((obj: { key: any; }) => obj.key !== 'report-history');
    //         }
    //     } catch (e: any) {
    //         console.log(e);
    //     }
    //     return tempNavigationConfig;
    // }

    // public createAllowed(permissions: any[]) {
    //     let allowed = false;
    //     try {
    //         permissions.forEach((permission) => {
    //             permission.forEach((item: { methods: string[]; }) => {
    //                 item.methods.forEach((methodItem) => {
    //                     if (methodItem === 'POST') {
    //                         allowed = true;
    //                     }
    //                 });
    //             });
    //         });
    //     }
    //     catch (e: any) {
    //         console.log(e);
    //     }
    //     return allowed;
    // }

    // public readAllowed(permissions: any[]) {
    //     let allowed = false;
    //     try {
    //         permissions.forEach((permission) => {
    //             permission.forEach((item: { methods: string[]; }) => {
    //                 item.methods.forEach((methodItem) => {
    //                     if (methodItem === 'GET') {
    //                         allowed = true;
    //                     }
    //                 });
    //             });
    //         });
    //     }
    //     catch (e: any) {
    //         console.log(e);
    //     }
    //     return allowed;
    // }

    // public updateAllowed(permissions: any[]) {
    //     let allowed = false;
    //     try {
    //         permissions.forEach((permission) => {
    //             permission.forEach((item: { methods: string[]; }) => {
    //                 item.methods.forEach((methodItem) => {
    //                     if (methodItem === 'PUT') {
    //                         allowed = true;
    //                     }
    //                 });
    //             });
    //         });
    //     }
    //     catch (e: any) {
    //         console.log(e);
    //     }
    //     return allowed;
    // }

    // public deleteAllowed(permissions: any[]) {
    //     let allowed = false;
    //     try {
    //         permissions.forEach((permission) => {
    //             permission.forEach((item: { methods: string[]; }) => {
    //                 item.methods.forEach((methodItem) => {
    //                     if (methodItem === 'DELETE') {
    //                         allowed = true;
    //                     }
    //                 });
    //             });
    //         });
    //     }
    //     catch (e: any) {
    //         console.log(e);
    //     }
    //     return allowed;
    // }

    // public async listUsers(page_number: number, page_size: number) {
    //     let userList = [];
    //     let data_count = 0;
    //     try {
    //         const response = await axiosService.get(`${ApiRouteConfig.authUsersRoute}?page_size=${page_size}&page=${page_number}`);
    //         userList = response.data.results;
    //         data_count = response.data.count;
    //     }
    //     catch (e: any) {
    //         userList = [];
    //     }
    //     return { data_count, userList };
    // }

    // public async getUserById(id: string) {
    //     let user = undefined;
    //     try {
    //         const response = await axiosService.get(`${ApiRouteConfig.authUsersRoute}${id}/`);
    //         user = response.data;
    //     }
    //     catch (e: any) {
    //         user = undefined;
    //     }
    //     return user;
    // }

    // public async createUser(email: string, password: string, first_name: string, last_name: string, phone_number: string) {
    //     let userCreated = false;
    //     const data = { email, password, first_name, last_name, phone_number };
    //     try {
    //         const response = await axiosService.post(ApiRouteConfig.authUsersRoute, data);
    //         if (response.data['user_type']) {
    //             userCreated = true;
    //         }
    //     }
    //     catch (e) {
    //         userCreated = false;
    //     }
    //     return userCreated;
    // }

    // public async updateUser(id: string, email: string, first_name: string, last_name: string, phone_number: string, is_active: boolean, groups: number[]) {
    //     let userUpdated = false;
    //     const data = { email, first_name, last_name, phone_number, is_active, groups };
    //     try {
    //         const response = await axiosService.put(`${ApiRouteConfig.authUsersRoute}${id}/`, data);
    //         if (response.data['user_type']) {
    //             userUpdated = true;
    //         }
    //     }
    //     catch (e) {
    //         userUpdated = false;
    //     }
    //     return userUpdated;
    // }

    // public async deleteUser(userId: string) {
    //     let userDeleted = false;
    //     try {
    //         await axiosService.delete(`${ApiRouteConfig.authUsersRoute}${userId}/`);
    //         userDeleted = true;
    //     }
    //     catch (e) {
    //         userDeleted = false;
    //     }
    //     return userDeleted;
    // }

    // public getUserEmail() {
    //     return axiosService.getUserEmail();
    // }

    // public async getUserRoles(page_number: number, page_size: number) {
    //     let userRolesList = [];
    //     let data_count = 0;
    //     try {
    //         const response = await axiosService.get(`${ApiRouteConfig.authRolesRoute}?page_size=${page_size}&page=${page_number}`);
    //         userRolesList = response.data.results;
    //         data_count = response.data.count;
    //     }
    //     catch (e: any) {
    //         userRolesList = [];
    //     }
    //     return { data_count, userRolesList };
    // }

    // public async createUserRole(name: string, read_only: boolean, methods: Array<string>, content_type: string) {
    //     let userRoleCreated = false;
    //     const data = { name, read_only, methods, content_type };
    //     try {
    //         const response = await axiosService.post(ApiRouteConfig.authRolesRoute, data);
    //         if (response.data['id']) {
    //             userRoleCreated = true;
    //         }
    //     }
    //     catch (e) {
    //         userRoleCreated = false;
    //     }
    //     return userRoleCreated;
    // }

    // public async updateUserRole(id: string, name: string, read_only: boolean, methods: Array<string>, content_type: string) {
    //     let userRoleUpdated = false;
    //     const data = { name, read_only, methods, content_type };
    //     try {
    //         const response = await axiosService.put(`${ApiRouteConfig.authRolesRoute}${id}/`, data);
    //         if (response.data['id']) {
    //             userRoleUpdated = true;
    //         }
    //     }
    //     catch (e) {
    //         userRoleUpdated = false;
    //     }
    //     return userRoleUpdated;
    // }

    // public async deleteUserRole(roleId: string) {
    //     let userRoleDeleted = false;
    //     try {
    //         await axiosService.delete(`${ApiRouteConfig.authRolesRoute}${roleId}/`);
    //         userRoleDeleted = true;
    //     }
    //     catch (e) {
    //         userRoleDeleted = false;
    //     }
    //     return userRoleDeleted;
    // }

    // public async getUserGroups(page_number: number, page_size: number) {
    //     let userGroupsList = [];
    //     let data_count = 0;
    //     try {
    //         const response = await axiosService.get(`${ApiRouteConfig.authGroupsRoute}?page_size=${page_size}&page=${page_number}`);
    //         userGroupsList = response.data.results;
    //         data_count = response.data.count;
    //     }
    //     catch (e: any) {
    //         userGroupsList = [];
    //     }
    //     return { data_count, userGroupsList };
    // }

    // public async createUserGroup(name: string, roles: Array<number>) {
    //     let userGroupCreated = false;
    //     const data = { name, roles };
    //     try {
    //         const response = await axiosService.post(ApiRouteConfig.authGroupsRoute, data);
    //         if (response.data['id']) {
    //             userGroupCreated = true;
    //         }
    //     }
    //     catch (e) {
    //         userGroupCreated = false;
    //     }
    //     return userGroupCreated;
    // }

    // public async updateUserGroup(id: string, name: string, roles: Array<number>) {
    //     let userGroupUpdated = false;
    //     const data = { name, roles };
    //     try {
    //         const response = await axiosService.put(`${ApiRouteConfig.authGroupsRoute}${id}/`, data);
    //         if (response.data['id']) {
    //             userGroupUpdated = true;
    //         }
    //     }
    //     catch (e) {
    //         userGroupUpdated = false;
    //     }
    //     return userGroupUpdated;
    // }

    // public async deleteUserGroup(groupId: string) {
    //     let userGroupDeleted = false;
    //     try {
    //         await axiosService.delete(`${ApiRouteConfig.authGroupsRoute}${groupId}/`);
    //         userGroupDeleted = true;
    //     }
    //     catch (e) {
    //         userGroupDeleted = false;
    //     }
    //     return userGroupDeleted;
    // }

    public static get Instance() {
        return this._instance || (this._instance = new this());
    }
}

const authService = AuthService.Instance;
export default authService;