export interface PhotoType {
    id: string;
    alt_description?: string;
    description?: string;
    blur_hash: string;
    user: {
        id: string | number;
        name?: string;
        first_name?: string;
        last_name?: string;
        instagram_username?: string;
    };
    links: {
        download: string;
    };
}
