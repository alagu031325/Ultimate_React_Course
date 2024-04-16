/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/FakeAuthContext";
import { useEffect } from "react";

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  //navigate should not be called from the top level code
  useEffect(
    function () {
      if (!isAuthenticated) navigate("/");
    },
    [navigate, isAuthenticated]
  );

  return isAuthenticated ? children : null;
}

export default ProtectedRoute;
