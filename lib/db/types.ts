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