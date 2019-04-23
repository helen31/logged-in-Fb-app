import { QueryResponseInterface } from './query-response.interface';

export interface UserInterface extends QueryResponseInterface {
    result: UserResultInterface;
}

interface UserResultInterface {
    user_id: number;
    token: string;
    expired_at: number;
}
