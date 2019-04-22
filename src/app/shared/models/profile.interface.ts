import { ResponseInterface } from './response.interface';

export interface ProfileInterface extends ResponseInterface{
    code: number;
    status: string;
    result: {
        id: number;
        username: string;
        country: string;
        city: string;
        first_name: string;
        last_name: string;
        email: string;
        image: string;
        lat: string; //todo is a string?
        lon: number;
        gender?: string;
        created_at: number;
        updated_at: number;
        accessToken?: {
            token: string;
            expired_at: number;
        };
    };
}

export interface EditProfileInterface {
    first_name: string;
    last_name: string;
    gender: string;
}
