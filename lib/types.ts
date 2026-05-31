export type Business = {
    address: string;
    created_at?: string;
    description: string | null;
    email: string;
    id?: string;
    name: string;
    phone: string;
    setup_completed?: boolean | null;
    setup_step: number
    slug?: string;
    user_id?: string;
};


export type ProgressCheck = {
    id: string;
    Tables: {
        count: number;
    }[];
    Business_hours: {
        count: number;
    }[];
    Settings: {
        count: number;
    }[];
};

export type setupProgress = {
    business: boolean;
    hours: boolean;
    settings: boolean;
    tables: boolean;
};

export type setupStep =
    | "business"
    | "hours"
    | "settings"
    | "tables"
    | "complete";


