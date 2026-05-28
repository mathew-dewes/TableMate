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

