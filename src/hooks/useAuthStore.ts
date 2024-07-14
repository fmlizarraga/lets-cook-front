import { useDispatch, useSelector } from "react-redux";
import { RootStore, onLogin, onLogout, onClearPosts } from "../store";
import { useRepository } from "./useRepository";

export const useAuthStore = () => {
    const { authStatus, user } = useSelector((state: RootStore) => state.auth);
    const dispatch = useDispatch();

    const { authRepository } = useRepository();
    const { loginUser, registerUser, checkUser } = authRepository.repository;

    const login = async (email: string, password: string) => {
        try {
            const loginResult = await loginUser(email, password);
    
            if (loginResult instanceof Error) {
                loginResult.name = 'authError';
                throw loginResult;
            }
    
            localStorage.setItem('token', loginResult.token);
    
            dispatch(onLogin({user: loginResult.user}));
        } catch (error) {
            console.error(error);
            if(error instanceof Error && error.name === 'authError') throw error;
            throw new Error('The task failed to complete, please try again later.');
        }
    };

    const logout = () => {
        dispatch(onClearPosts());
        dispatch(onLogout());
    };

    const register = async (name: string, email: string, password: string, picture?: string) => {
        try {
            const result = await registerUser(name,email,password,picture);
    
            if (result instanceof Error) throw result;
        } catch (error) {
            console.error(error);
            throw new Error('The task failed to complete, please try again later.');
        }
    };

    const check = async () => {
        const currentToken = localStorage.getItem('token');
        try {
            if(!currentToken) {
                logout();
                throw new Error('Your session has expired.');
            }
            const checkResult = await checkUser(currentToken);

            if (checkResult instanceof Error) throw checkResult;

            localStorage.setItem('token', checkResult);
        } catch (error) {
            console.error(error);
            throw new Error('The task failed to complete, please try again later.');
        }
    };

    return {
        // * Properties
        authStatus,
        user,
        // * Methods
        login,
        logout,
        register,
        check,
    };
};
