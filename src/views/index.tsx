import { Route, Switch, Redirect } from "react-router-dom";
import React from "react";
import CompanyView from "./company-views";
import ProcurementBuyerView from "./procurement-buyer-views";
import ProcurementSupplierView from "./procurement-supplier-views";
import IssuerAdminView from "./issuer-admin-views";
import AuthView from "./auth-views";
import { HOME_PREFIX_PATH, AUTH_PREFIX_PATH, COMPANY_PREFIX_PATH, PROCUREMENT_BUYER_PREFIX_PATH, PROCUREMENT_SUPPLIER_PREFIX_PATH, ISSUER_ADMIN_PREFIX_PATH } from "configs/AppConfig";

export const Views = (props: Record<string, any>) => {
    return (
        <Switch>
            <Route exact path={HOME_PREFIX_PATH} render={() => (<Redirect to={AUTH_PREFIX_PATH} />)} />
            <Route path={AUTH_PREFIX_PATH}>
                <AuthView {...props} />
            </Route>
            <Route path={COMPANY_PREFIX_PATH}>
                <CompanyView {...props} />
            </Route>
            <Route path={PROCUREMENT_BUYER_PREFIX_PATH}>
                <ProcurementBuyerView {...props} />
            </Route>
            <Route path={PROCUREMENT_SUPPLIER_PREFIX_PATH}>
                <ProcurementSupplierView {...props} />
            </Route>
            <Route path={ISSUER_ADMIN_PREFIX_PATH}>
                <IssuerAdminView {...props} />
            </Route>
        </Switch>
    );
};

export default Views;
