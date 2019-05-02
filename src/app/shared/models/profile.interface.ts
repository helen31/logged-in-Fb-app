export interface ProfileInterface {
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
    token?: string;
    accessToken?: AccessTokenInterface;
}

interface AccessTokenInterface {
    token: string;
    expired_at: number;
    user_id: number;
}

