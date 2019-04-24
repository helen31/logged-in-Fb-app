import { QueryResponseInterface } from './query-response.interface';

export interface ProfileInterface extends QueryResponseInterface {
    result: ProfileResultInterface;
}

export interface ProfileResultInterface {
    result: string;
    id: number;
    username: string;
    country: string;
    city: string;
    first_name: string;
    last_name: string;
    email: string;
    image: string;
    lat: number;
    lon: number;
    gender?: string;
    created_at: number;
    updated_at: number;
    accessToken?: {
        token: string;
        expired_at: number;
    };
}

export interface EditProfileInterface {
    first_name: string;
    last_name: string;
    gender: string;
}
