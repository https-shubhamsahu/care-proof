export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      care_entries: {
        Row: {
          id: string
          user_id: string
          activity: string
          date: string
          hours: number
          skills: string[]
          evidence_url: string | null
          evidence_name: string | null
          care_type: string
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          activity: string
          date: string
          hours: number
          skills?: string[]
          evidence_url?: string | null
          evidence_name?: string | null
          care_type?: string
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          activity?: string
          date?: string
          hours?: number
          skills?: string[]
          evidence_url?: string | null
          evidence_name?: string | null
          care_type?: string
          notes?: string | null
          updated_at?: string
        }
      }
      care_scores: {
        Row: {
          id: string
          user_id: string
          total_score: number
          responsibility_points: number
          consistency_points: number
          complexity_points: number
          total_hours: number
          total_entries: number
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          total_score?: number
          responsibility_points?: number
          consistency_points?: number
          complexity_points?: number
          total_hours?: number
          total_entries?: number
          updated_at?: string
        }
        Update: {
          total_score?: number
          responsibility_points?: number
          consistency_points?: number
          complexity_points?: number
          total_hours?: number
          total_entries?: number
          updated_at?: string
        }
      }
      care_valuations: {
        Row: {
          id: string
          user_id: string
          daily_value_inr: number
          monthly_value_inr: number
          lifetime_value_inr: number
          hourly_rate_inr: number
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          daily_value_inr?: number
          monthly_value_inr?: number
          lifetime_value_inr?: number
          hourly_rate_inr?: number
          updated_at?: string
        }
        Update: {
          daily_value_inr?: number
          monthly_value_inr?: number
          lifetime_value_inr?: number
          hourly_rate_inr?: number
          updated_at?: string
        }
      }
      community_stats: {
        Row: {
          id: string
          total_users: number
          total_care_hours: number
          total_value_inr: number
          updated_at: string
        }
        Insert: {
          id?: string
          total_users?: number
          total_care_hours?: number
          total_value_inr?: number
          updated_at?: string
        }
        Update: {
          total_users?: number
          total_care_hours?: number
          total_value_inr?: number
          updated_at?: string
        }
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

export const Constants = {
  public: {
    Enums: {},
  },
} as const
