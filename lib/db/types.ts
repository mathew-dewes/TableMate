export type BusinessType = {
        id: string;
        name: string;
        address: string;
        region: string;
        email: string;
        slug: string;
        phone: string | null;
        description: string | null;
        Availability:{
            day_of_week: string,
            opening_time: string,
            closing_time: string
        }[]
    };


export type AvailabilityType = {
    day_of_week: number,
    opening_time: string,
    closing_time: string,
    booking_duration: number
};

export type ExistingBookings = {table_id: string, start_time: string, end_time: string};

export type EligibleTables = { id: string, table_number: number, capacity: number };

