export interface UserInterface {
    code: number;
    status: string;
    result: {
        user_id: number;
        token: string;
        expired_at: number;
    };
}
