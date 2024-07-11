import { User } from "../interfaces";
import { AuthRepository } from "./authRepository";

const DEMO_USERS: User[] = [
    {
        id: 'uid0001',
        name: 'Pepe',
        email: 'pepe@mail.com',
        group: 'Gold'
    },
    {
        id: 'uid0002',
        name: 'Maria',
        email: 'maria@mail.com',
        group: 'Member'
    },
];

const DEMO_CREDENTIALS = [
    {user: DEMO_USERS[0], password: '1234'},
    {user: DEMO_USERS[1], password: 'abc123'},
];

const LocalAuthRepository: AuthRepository = {
    loginUser: async (email, password) => {
        const myUser = DEMO_CREDENTIALS.find(item => item.user.email === email);
        if(myUser && myUser.password === password) return {user: myUser.user, token: 'fake-jwt-token'};
        return new Error('Wrong user or password.');
    },
    registerUser: async (user, password) => {
        const existentUser = DEMO_USERS.find(u => u.email === user.email);
        if(existentUser) return new Error('An user with that email already exists.');
        DEMO_CREDENTIALS.push({user: user, password: password});
        return;
    },
    checkUser: async token => 'fake-jwt-token',
};

export default LocalAuthRepository;