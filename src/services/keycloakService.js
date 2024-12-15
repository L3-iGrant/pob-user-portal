import Keycloak from "keycloak-js";

const keycloakConfig = {
    url: 'https://staging-consent-bb-iam.igrant.io',
    realm: 'oidc-facade',
    clientId: 'React'
};

export const keycloak = new Keycloak(keycloakConfig);

export const initKeycloak = () => {
    return keycloak.init({
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
        pkceMethod: 'S256'
    });
};

export const doLogin = () => {
    keycloak.login({
        idpHint: 'oidc'
    });
};

export const doLogout = async () => {
    try {
        // Perform back channel logout
        await keycloak.logout();
        return true;
    } catch (error) {
        console.error('Keycloak logout failed:', error);
        return false;
    }
};

export const getToken = () => {
    return keycloak.token;
};

export const isLoggedIn = () => {
    return !!keycloak.token;
};

export const updateToken = (minValidity) => {
    return keycloak.updateToken(minValidity);
};