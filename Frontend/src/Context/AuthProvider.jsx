import { createContext, useEffect, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // نحاول نجيب التوكن من localStorage
        const token = localStorage.getItem("token");

        if (token) {
            setAuth({ token }); // نخزن التوكن في الـ context
        }

        setLoading(false); // خلصنا التحميل
    }, []);
    
    return (
        <AuthContext.Provider value={{ auth, setAuth}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;