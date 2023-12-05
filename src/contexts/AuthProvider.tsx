import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingScreen from "../screens/LoadingScreen";
import { jwtDecode } from "jwt-decode";
import { decode, encode } from 'base-64';

type User = {
    id: string,
    name: string,
    email: string,
    createdAt: string
};

interface handleLoginProps {
    token: string;
    user: User | null;
}

interface AuthStateProps {
    user: User | null;
    token: string;
}


const AuthContext = createContext<null | any>(null);

export const useAuth = () => {
    return useContext(AuthContext);
}

const AuthProvider = ({ children }: { children: React.ReactNode }) => {

    const [loading, setLoading] = useState(true);
    const [auth, setAuth] = useState<AuthStateProps>({
        user: null,
        token: "",
    });

    axios.defaults.headers.common["Authorization"] = auth?.token || "";

    if (!global.btoa) {
        global.btoa = encode;
    }

    if (!global.atob) {
        global.atob = decode;
    }

    useEffect(() => {
        const getLocalData = async () => {
            try {
                const dataToBeParsed = await AsyncStorage.getItem('auth');
                const storedAuth = JSON.parse(dataToBeParsed!);
                if (storedAuth) {
                    const decodedToken = jwtDecode(storedAuth.token);
                    const expiresAt = decodedToken?.exp;
                    const currentTime = Math.floor(Date.now() / 1000);
                    if (expiresAt! <= currentTime) {
                        setAuth({ user: null, token: "" });
                        localStorage.removeItem('auth');
                        return;
                    } else {
                        setAuth({
                            user: storedAuth.user,
                            token: storedAuth.token,
                        });
                    }
                }
            } finally {
                setLoading(false); // Set loading to false once the data is retrieved
            }
        };
        getLocalData();
    }, []);

    const handleLogin = async ({ token, user }: handleLoginProps) => {
        setAuth({ user, token });
        await AsyncStorage.setItem('auth', JSON.stringify({ user, token }));
        return;
    }

    const handleLogout = async () => {
        setAuth({ user: null, token: "" });
        await AsyncStorage.removeItem('auth');
        return;
    }

    if (loading) {
        return <LoadingScreen />;
    }

    return (
        <AuthContext.Provider
            value={{
                auth, setAuth,
                handleLogin,
                handleLogout,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;