import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";

import { ISSUER_ADMIN_PREFIX_PATH } from "configs/AppConfig";
import Loading from "components/shared-components/Loading";
import LandingPage from "./components/landingpage";

export const IssuerAdminView = () => {
  return (
    <Suspense fallback={<Loading cover="page" />}>
      <Switch>
        <Route
          exact
          path={`${ISSUER_ADMIN_PREFIX_PATH}/`}
          component={LandingPage}
        />
      </Switch>
    </Suspense>
  );
};

export default IssuerAdminView;
