import AppRouter from "./router/AppRouter";
import { Provider } from "react-redux";
import { store } from "./store";
import { AuthRepositoryProvider, BlogRepositoryProvider } from "./repository";
import LocalAuthRepository from "./repository/LocalAuthRepository";
import LocalBlogRepository from "./repository/LocalBlogRepository";

import 'primereact/resources/themes/lara-dark-amber/theme.css';
import 'primeicons/primeicons.css';

function LetsCookApp() {
    const authRepository = LocalAuthRepository;
    const blogRepository = LocalBlogRepository;
    return (
        <>
            <Provider store={store}>
                <AuthRepositoryProvider repository={authRepository}>
                    <BlogRepositoryProvider repository={blogRepository}>
                        <AppRouter/>
                    </BlogRepositoryProvider>
                </AuthRepositoryProvider>
            </Provider>
        </>
    )
};

export default LetsCookApp;
