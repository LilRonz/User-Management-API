export interface UserType {
    title: string;
    firstName: string;
    lastName: string;
    role: string;
    email: string;
}

export interface UserUpdate {
    title?: string;
    firstName?: string;
    lastName?: string;
    role?: string;
    email?: string;
}