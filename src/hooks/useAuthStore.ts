import { useDispatch, useSelector } from "react-redux";
import { RootStore, onLogin, onLogout } from "../store";
import { useRepository } from "./useRepository";
import { User } from "../interfaces";

export const useAuthStore = () => {
    const { authStatus, user } = useSelector((state: RootStore) => state.auth);
    const dispatch = useDispatch();

    const { authRepository } = useRepository();
    const { loginUser, registerUser, checkUser } = authRepository.repository;

    const login = async (email: string, password: string) => {
        try {
            const loginResult = await loginUser(email, password);
    
            if (loginResult instanceof Error) throw loginResult;
    
            localStorage.setItem('token', loginResult.token);
    
            dispatch(onLogin({user: loginResult.user}));
        } catch (error) {
            console.log(error);
            throw new Error('The task failed to complete, please try again later.');
        }
    };

    const logout = () => {
        dispatch(onLogout());
    };

    const register = async (user: User, password: string) => {
        try {
            const result = await registerUser(user, password);
    
            if (result instanceof Error) throw result;
        } catch (error) {
            console.log(error);
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
            console.log(error);
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
