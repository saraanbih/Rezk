import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../Context/AuthProvider";
import UnAuthorized from "./UnAuthorized.jsx";
const RequireAuth = () => {
    const { auth, loading } = useContext(AuthContext);

    if (loading) {
        return (
            <section className="w-full h-[100vh] flex items-center justify-center bg-[#1E1E1E] text-white">
                <h2 className="text-[24px]">جارٍ التحميل...</h2>
            </section>
        );
    }

    return auth?.token ? (
        <Outlet />
    ) : (
        <UnAuthorized />
    );
};

export default RequireAuth;