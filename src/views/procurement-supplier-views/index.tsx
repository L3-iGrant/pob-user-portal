import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";

import { PROCUREMENT_SUPPLIER_PREFIX_PATH } from "configs/AppConfig";
import Loading from "components/shared-components/Loading";
import LandingPage from "./components/landingpage";

export const ProcurementSupplierView = () => {
  return (
    <Suspense fallback={<Loading cover="page" />}>
      <Switch>
        <Route
          exact
          path={`${PROCUREMENT_SUPPLIER_PREFIX_PATH}/`}
          component={LandingPage}
        />
      </Switch>
    </Suspense>
  );
};

export default ProcurementSupplierView;
