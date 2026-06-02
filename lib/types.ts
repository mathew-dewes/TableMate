export type Business = {
    id: string;
    name: string;
    phone: string;
    description: string | null;
    address: string;
    publish: boolean;
    email: string;
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


