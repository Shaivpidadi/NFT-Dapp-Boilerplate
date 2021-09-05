import React from "react";

export const userRoutes = [
  {
    path: "/",
    exact: true,
    name: "Dashboard",
    component: React.lazy(() => import("../../components/DummyNFT/DummyNFT")),
  },

  // Main route's default dashboard
  {
    redirectRoute: true,
    name: "dashboardRedirect",
    path: "/",
  },
];
