export interface User {
    id: number;
    name: string;
    last_name: string;
    email: string;
    role: string;
}

export interface UserPost {
    name: string;
    lastname: string;
    username: string;
    email: string;
    password: string;
    role: string;
}

export interface Token {
    token: string
}

export interface Login {
    email : string,
    password : string,
}