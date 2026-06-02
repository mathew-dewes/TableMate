export type Business = {
    id: string;
    name: string;
    phone: string;
    description: string | null;
    address: string;
    publish: boolean;
    email: string;
    Tables: {
        id: string,
        number: number,
        max_capacity: number,
        min_capacity: number
    }[],
    Business_hours: {
        open: number,
        close: number,
        day_of_week: string
    }[],
    Settings:{
        id: string,
        max_party_size: number,
        booking_duration: number,
        slot_interval_minutes: number,
        max_future_booking_days: number
    }
};

export type Table = {id: string, number: number, max_capacity: number, min_capacity: number}

export type businessHours = {open: number, close: number, day_of_week: string}

export type BusinessSettings = {
    id: string,
    max_party_size: number, 
    booking_duration: number,
    slot_interval_minutes: number,
    max_future_booking_days: number
}

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
    };
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

export type businessForms =  | "business"
    | "hours"
    | "settings"
    | "tables"

