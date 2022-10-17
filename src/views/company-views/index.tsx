import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";

import { COMPANY_PREFIX_PATH } from "configs/AppConfig";
import Loading from "components/shared-components/Loading";
import LandingPage from "./components/landing";

export const CompanyView = () => {
  return (
    <Suspense fallback={<Loading cover="page" />}>
      <Switch>
        <Route
          exact
          path={`${COMPANY_PREFIX_PATH}/`}
          component={LandingPage}
        />
      </Switch>
    </Suspense>
  );
};

export default CompanyView;
