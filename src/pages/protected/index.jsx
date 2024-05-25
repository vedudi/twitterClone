import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { Navigate, Outlet} from "react-router-dom";
import { auth } from "../../fireBase/config";

const Protected = () => {

  const [isAuth, setIsAuth] = useState();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setIsAuth(user ? true : false);
    });
  }, []);
  if (isAuth===false) return <Navigate to="/"/>
  return <Outlet />
};

export default Protected;
