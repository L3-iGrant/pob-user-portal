import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";

import { PROCUREMENT_BUYER_PREFIX_PATH } from "configs/AppConfig";
import Loading from "components/shared-components/Loading";
import LandingPage from "./components/landingpage";

export const ProcurementBuyerView = () => {
  return (
    <Suspense fallback={<Loading cover="page" />}>
      <Switch>
        <Route
          exact
          path={`${PROCUREMENT_BUYER_PREFIX_PATH}/`}
          component={LandingPage}
        />
      </Switch>
    </Suspense>
  );
};

export default ProcurementBuyerView;
