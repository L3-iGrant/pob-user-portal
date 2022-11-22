import { Route, Switch } from "react-router-dom";
import React from "react";
import CompanyView from "./company-views";
import AuthView from "./auth-views";
import { AUTH_PREFIX_PATH, COMPANY_PREFIX_PATH } from "configs/AppConfig";
import Protected from "./protected";

export const Views = (props: Record<string, any>) => {
    return (
        <Switch>
            <Route exact path={AUTH_PREFIX_PATH}>
                <AuthView {...props} />
            </Route>
            <Protected>
                <Route path={COMPANY_PREFIX_PATH}>
                    <CompanyView {...props} />
                </Route>
            </Protected>

        </Switch>
    );
};

export default Views;
