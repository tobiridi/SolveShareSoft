export interface User {
    userId?: string;
    email?: string;
    password?: string;
    username: string;
    website?: string;
    pays?: string;
    biography?: string;
    picture?: any;
    role?: string;
    status?: string;
    lastConnection?: Date;
    register?: Date;
    lastUpdate?: Date;
    blockPeriod?: Date;
    blockMotif?: string;
}
