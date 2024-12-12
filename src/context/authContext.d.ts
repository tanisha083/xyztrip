import { User } from 'firebase/auth';
interface AuthContextType {
    user: User | null;
    loading: boolean;
}
export declare const AuthContext: import("react").Context<AuthContextType>;
export declare const useAuth: () => AuthContextType;
export {};
