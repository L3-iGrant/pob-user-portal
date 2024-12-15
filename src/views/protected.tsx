import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { keycloak } from "services/keycloakService";
import { getAuthTokenFromLocalStorage } from "utils/localStorage";
import authService from "services/authService";

const Protected = (props: { children: any }) => {
    const history = useHistory();
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkAuthorization = async () => {
            const token = getAuthTokenFromLocalStorage();
            const isKeycloakToken = token && token.split('.').length === 3;
            console.log(token)
            console.log(keycloak.tokenParsed)
            

            if (isKeycloakToken && keycloak.tokenParsed) {
                const email = keycloak.tokenParsed.email;
                console.log("Reached here")
                console.log(email)
                if (email) {
                    try {
                        const userType = await authService.getUserType(email);
                        if (userType) {
                            setIsAuthorized(true);
                        } else {
                            console.error("User type not found");
                            await authService.logoutUser();
                            history.push("/");
                        }
                    } catch (error) {
                        console.error("Failed to get user type:", error);
                        await authService.logoutUser();
                        history.push("/");
                    }
                } else {
                    console.error("No email found in token");
                    await authService.logoutUser();
                    history.push("/");
                }
            } else if (token) {
                // Handle regular token authentication
                setIsAuthorized(true);
            } else {
                console.log("Not authenticated");
                history.push("/");
            }
            setIsLoading(false);
        };

        checkAuthorization();
    }, [history]);

    if (isLoading) {
        return null; // Or a loading spinner
    }

    return isAuthorized ? props.children : null;
};

export default Protected;