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
    PostgrestVersion: "14.4"
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
      Availability: {
        Row: {
          business_id: string
          closing_time: string
          created_at: string
          day_of_week: number
          id: string
          opening_time: string
        }
        Insert: {
          business_id?: string
          closing_time: string
          created_at?: string
          day_of_week: number
          id?: string
          opening_time: string
        }
        Update: {
          business_id?: string
          closing_time?: string
          created_at?: string
          day_of_week?: number
          id?: string
          opening_time?: string
        }
        Relationships: [
          {
            foreignKeyName: "Availability_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "Business"
            referencedColumns: ["id"]
          },
        ]
      }
      Booking: {
        Row: {
          business_id: string
          created_at: string
          end_time: string
          id: string
          party_size: number
          source: string
          start_time: string
          status: string
          table_id: string
        }
        Insert: {
          business_id?: string
          created_at?: string
          end_time: string
          id?: string
          party_size: number
          source?: string
          start_time: string
          status?: string
          table_id?: string
        }
        Update: {
          business_id?: string
          created_at?: string
          end_time?: string
          id?: string
          party_size?: number
          source?: string
          start_time?: string
          status?: string
          table_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "Booking_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "Business"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Booking_table_id_fkey"
            columns: ["table_id"]
            isOneToOne: false
            referencedRelation: "Table"
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
          is_public: boolean
          name: string
          phone: string | null
          region: string
          setup_step: number | null
          slug: string
          user_id: string
        }
        Insert: {
          address: string
          created_at?: string
          description?: string | null
          email: string
          id?: string
          is_public?: boolean
          name: string
          phone?: string | null
          region: string
          setup_step?: number | null
          slug: string
          user_id?: string
        }
        Update: {
          address?: string
          created_at?: string
          description?: string | null
          email?: string
          id?: string
          is_public?: boolean
          name?: string
          phone?: string | null
          region?: string
          setup_step?: number | null
          slug?: string
          user_id?: string
        }
        Relationships: []
      }
      Settings: {
        Row: {
          booking_duration: number
          business_id: string
          created_at: string
          id: string
        }
        Insert: {
          booking_duration?: number
          business_id?: string
          created_at?: string
          id?: string
        }
        Update: {
          booking_duration?: number
          business_id?: string
          created_at?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "Settings_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "Business"
            referencedColumns: ["id"]
          },
        ]
      }
      Table: {
        Row: {
          active: boolean
          business_id: string | null
          capacity: number
          created_at: string
          id: string
          table_number: number
        }
        Insert: {
          active?: boolean
          business_id?: string | null
          capacity: number
          created_at?: string
          id?: string
          table_number: number
        }
        Update: {
          active?: boolean
          business_id?: string | null
          capacity?: number
          created_at?: string
          id?: string
          table_number?: number
        }
        Relationships: [
          {
            foreignKeyName: "Table_business_id_fkey"
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
      [_ in never]: never
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
    Enums: {},
  },
} as const
