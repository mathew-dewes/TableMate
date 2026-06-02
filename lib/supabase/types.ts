export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      Blocked_times: {
        Row: {
          business_id: string
          end_time: string
          id: string
          start_time: string
        }
        Insert: {
          business_id: string
          end_time: string
          id?: string
          start_time: string
        }
        Update: {
          business_id?: string
          end_time?: string
          id?: string
          start_time?: string
        }
        Relationships: [
          {
            foreignKeyName: "Blocked_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "Business"
            referencedColumns: ["id"]
          },
        ]
      }
      Bookings: {
        Row: {
          business_id: string
          created_at: string
          created_by_user_id: string | null
          customer_id: string
          customer_name: string
          date: string
          details: string
          end_minutes: number
          guest_amount: number
          id: string
          notes: string | null
          source: Database["public"]["Enums"]["BOOKING_SOURCE"] | null
          start_minutes: number
          status: Database["public"]["Enums"]["BOOKING_STATUS"]
          table_id: string
          table_number: number
        }
        Insert: {
          business_id: string
          created_at?: string
          created_by_user_id?: string | null
          customer_id: string
          customer_name: string
          date: string
          details: string
          end_minutes: number
          guest_amount: number
          id?: string
          notes?: string | null
          source?: Database["public"]["Enums"]["BOOKING_SOURCE"] | null
          start_minutes: number
          status: Database["public"]["Enums"]["BOOKING_STATUS"]
          table_id: string
          table_number: number
        }
        Update: {
          business_id?: string
          created_at?: string
          created_by_user_id?: string | null
          customer_id?: string
          customer_name?: string
          date?: string
          details?: string
          end_minutes?: number
          guest_amount?: number
          id?: string
          notes?: string | null
          source?: Database["public"]["Enums"]["BOOKING_SOURCE"] | null
          start_minutes?: number
          status?: Database["public"]["Enums"]["BOOKING_STATUS"]
          table_id?: string
          table_number?: number
        }
        Relationships: [
          {
            foreignKeyName: "Reservations_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "Business"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Reservations_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Reservations_table_id_fkey"
            columns: ["table_id"]
            isOneToOne: false
            referencedRelation: "Tables"
            referencedColumns: ["id"]
          },
        ]
      }
      Business: {
        Row: {
          address: string
          created_at: string
          description: string | null
          email: string
          id: string
          name: string
          phone: string
          publish: boolean
          slug: string
          user_id: string
        }
        Insert: {
          address: string
          created_at?: string
          description?: string | null
          email: string
          id?: string
          name: string
          phone: string
          publish?: boolean
          slug: string
          user_id: string
        }
        Update: {
          address?: string
          created_at?: string
          description?: string | null
          email?: string
          id?: string
          name?: string
          phone?: string
          publish?: boolean
          slug?: string
          user_id?: string
        }
        Relationships: []
      }
      Business_hours: {
        Row: {
          business_id: string
          close: number
          day_of_week: string
          id: string
          open: number
        }
        Insert: {
          business_id: string
          close: number
          day_of_week: string
          id?: string
          open: number
        }
        Update: {
          business_id?: string
          close?: number
          day_of_week?: string
          id?: string
          open?: number
        }
        Relationships: [
          {
            foreignKeyName: "Business_hours_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "Business"
            referencedColumns: ["id"]
          },
        ]
      }
      customers: {
        Row: {
          created_at: string
          email: string
          id: string
          name: string
          phone: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          name: string
          phone: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          name?: string
          phone?: string
        }
        Relationships: []
      }
      Settings: {
        Row: {
          booking_duration: number
          business_id: string
          created_at: string
          id: string
          max_future_booking_days: number
          max_party_size: number
          slot_interval_minutes: number
        }
        Insert: {
          booking_duration: number
          business_id: string
          created_at?: string
          id?: string
          max_future_booking_days: number
          max_party_size: number
          slot_interval_minutes: number
        }
        Update: {
          booking_duration?: number
          business_id?: string
          created_at?: string
          id?: string
          max_future_booking_days?: number
          max_party_size?: number
          slot_interval_minutes?: number
        }
        Relationships: [
          {
            foreignKeyName: "Settings_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: true
            referencedRelation: "Business"
            referencedColumns: ["id"]
          },
        ]
      }
      Table_combinations: {
        Row: {
          child_table_id: string
          created_at: string
          id: string
          parent_table_id: string
        }
        Insert: {
          child_table_id: string
          created_at?: string
          id?: string
          parent_table_id: string
        }
        Update: {
          child_table_id?: string
          created_at?: string
          id?: string
          parent_table_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "Table_combinations_child_table_id_fkey"
            columns: ["child_table_id"]
            isOneToOne: false
            referencedRelation: "Tables"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Table_combinations_parent_table_id_fkey"
            columns: ["parent_table_id"]
            isOneToOne: false
            referencedRelation: "Tables"
            referencedColumns: ["id"]
          },
        ]
      }
      Tables: {
        Row: {
          business_id: string
          created_at: string
          id: string
          max_capacity: number
          min_capacity: number
          number: number
        }
        Insert: {
          business_id: string
          created_at?: string
          id?: string
          max_capacity: number
          min_capacity: number
          number: number
        }
        Update: {
          business_id?: string
          created_at?: string
          id?: string
          max_capacity?: number
          min_capacity?: number
          number?: number
        }
        Relationships: [
          {
            foreignKeyName: "Tables_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "Business"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      BOOKING_SOURCE: "online" | "phone" | "walk_in" | "staff"
      BOOKING_STATUS:
        | "pending"
        | "confirmed"
        | "seated"
        | "completed"
        | "cancelled"
        | "no_show"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {
      BOOKING_SOURCE: ["online", "phone", "walk_in", "staff"],
      BOOKING_STATUS: [
        "pending",
        "confirmed",
        "seated",
        "completed",
        "cancelled",
        "no_show",
      ],
    },
  },
} as const
