import { User } from "../interfaces";
import { AuthRepository } from "./authRepository";

const DEMO_USERS: User[] = [
    {
        id: 'uid0001',
        name: 'Pepe',
        email: 'pepe@mail.com',
        group: 'Gold',
        picture: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Kermit_the_frog_hollywood_walk_of_fame_%286917430870%29.jpg/240px-Kermit_the_frog_hollywood_walk_of_fame_%286917430870%29.jpg'
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
    registerUser: async (name, email, password, pictureURL) => {
        const user: User = {
            id: 'uid' + (DEMO_USERS.length + 1).toLocaleString(
                'en-US',
                {
                    minimumIntegerDigits: 4,
                    useGrouping: false
                }
            ),
            name,
            email,
            group: 'Member',
            picture: pictureURL
        };
        const existentUser = DEMO_USERS.find(u => u.email === user.email);
        if(existentUser) return new Error('An user with that email already exists.');
        DEMO_CREDENTIALS.push({user: user, password: password});
        return;
    },
    checkUser: async token => 'fake-jwt-token',
};

export default LocalAuthRepository;