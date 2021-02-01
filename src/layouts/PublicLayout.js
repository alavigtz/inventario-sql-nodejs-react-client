import React from "react";
import { Route, Redirect } from "react-router-dom";
import AdminHome from "../pages/Admin/AdminHome";

export default function PublicLayout() {
  return (
    <>
      <Route path="/admin/" component={AdminHome} />
      <Redirect to="/admin/" />
    </>
  );
}
