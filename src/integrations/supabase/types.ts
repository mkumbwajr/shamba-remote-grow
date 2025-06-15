export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      chat_messages: {
        Row: {
          created_at: string
          hired_worker_id: string
          id: string
          message: string
          read_at: string | null
          sender_type: string
          user_id: string
        }
        Insert: {
          created_at?: string
          hired_worker_id: string
          id?: string
          message: string
          read_at?: string | null
          sender_type: string
          user_id: string
        }
        Update: {
          created_at?: string
          hired_worker_id?: string
          id?: string
          message?: string
          read_at?: string | null
          sender_type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_messages_hired_worker_id_fkey"
            columns: ["hired_worker_id"]
            isOneToOne: false
            referencedRelation: "hired_workers"
            referencedColumns: ["id"]
          },
        ]
      }
      comments: {
        Row: {
          content: string
          created_at: string
          id: string
          post_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          post_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          post_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
        ]
      }
      farms: {
        Row: {
          actual_yield: number | null
          created_at: string
          crop_type: string | null
          end_date: string | null
          expected_yield: number | null
          id: string
          investment_amount: number | null
          location: string | null
          name: string
          notes: string | null
          size: number | null
          size_unit: string | null
          start_date: string | null
          status: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          actual_yield?: number | null
          created_at?: string
          crop_type?: string | null
          end_date?: string | null
          expected_yield?: number | null
          id?: string
          investment_amount?: number | null
          location?: string | null
          name: string
          notes?: string | null
          size?: number | null
          size_unit?: string | null
          start_date?: string | null
          status?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          actual_yield?: number | null
          created_at?: string
          crop_type?: string | null
          end_date?: string | null
          expected_yield?: number | null
          id?: string
          investment_amount?: number | null
          location?: string | null
          name?: string
          notes?: string | null
          size?: number | null
          size_unit?: string | null
          start_date?: string | null
          status?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      hired_workers: {
        Row: {
          created_at: string
          end_date: string | null
          farm_location: string | null
          hire_date: string
          id: string
          job_description: string | null
          notes: string | null
          rate: number
          rate_type: string
          status: string
          updated_at: string
          user_id: string
          worker_id: string
          worker_name: string
          worker_phone: string
          worker_specialization: string
        }
        Insert: {
          created_at?: string
          end_date?: string | null
          farm_location?: string | null
          hire_date?: string
          id?: string
          job_description?: string | null
          notes?: string | null
          rate: number
          rate_type?: string
          status?: string
          updated_at?: string
          user_id: string
          worker_id: string
          worker_name: string
          worker_phone: string
          worker_specialization: string
        }
        Update: {
          created_at?: string
          end_date?: string | null
          farm_location?: string | null
          hire_date?: string
          id?: string
          job_description?: string | null
          notes?: string | null
          rate?: number
          rate_type?: string
          status?: string
          updated_at?: string
          user_id?: string
          worker_id?: string
          worker_name?: string
          worker_phone?: string
          worker_specialization?: string
        }
        Relationships: []
      }
      likes: {
        Row: {
          created_at: string
          id: string
          post_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          post_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          post_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "likes_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
        ]
      }
      news_articles: {
        Row: {
          author_name: string
          category: string
          content: string
          created_at: string
          excerpt: string | null
          id: string
          image_url: string | null
          published_at: string
          title: string
          updated_at: string
        }
        Insert: {
          author_name?: string
          category?: string
          content: string
          created_at?: string
          excerpt?: string | null
          id?: string
          image_url?: string | null
          published_at?: string
          title: string
          updated_at?: string
        }
        Update: {
          author_name?: string
          category?: string
          content?: string
          created_at?: string
          excerpt?: string | null
          id?: string
          image_url?: string | null
          published_at?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      news_comments: {
        Row: {
          article_id: string
          content: string
          created_at: string
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          article_id: string
          content: string
          created_at?: string
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          article_id?: string
          content?: string
          created_at?: string
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "news_comments_article_id_fkey"
            columns: ["article_id"]
            isOneToOne: false
            referencedRelation: "news_articles"
            referencedColumns: ["id"]
          },
        ]
      }
      posts: {
        Row: {
          content: string | null
          created_at: string
          id: string
          image_url: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          content?: string | null
          created_at?: string
          id?: string
          image_url?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          content?: string | null
          created_at?: string
          id?: string
          image_url?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      product_comments: {
        Row: {
          content: string
          created_at: string
          id: string
          product_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          product_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          product_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      product_ratings: {
        Row: {
          created_at: string
          id: string
          product_id: string
          rating: number
          review: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          product_id: string
          rating: number
          review?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          product_id?: string
          rating?: number
          review?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          bio: string | null
          citizenship: string | null
          country: string | null
          created_at: string | null
          farm_location: string | null
          farm_size: string | null
          farming_experience: string | null
          farming_goals: string | null
          full_name: string | null
          id: string
          interested_services: string | null
          investment_budget: string | null
          languages_spoken: string | null
          nida_number: string | null
          passport_number: string | null
          phone: string | null
          preferred_contact_method: string | null
          preferred_crop: string | null
          social_media: string | null
          updated_at: string | null
          website: string | null
        }
        Insert: {
          bio?: string | null
          citizenship?: string | null
          country?: string | null
          created_at?: string | null
          farm_location?: string | null
          farm_size?: string | null
          farming_experience?: string | null
          farming_goals?: string | null
          full_name?: string | null
          id: string
          interested_services?: string | null
          investment_budget?: string | null
          languages_spoken?: string | null
          nida_number?: string | null
          passport_number?: string | null
          phone?: string | null
          preferred_contact_method?: string | null
          preferred_crop?: string | null
          social_media?: string | null
          updated_at?: string | null
          website?: string | null
        }
        Update: {
          bio?: string | null
          citizenship?: string | null
          country?: string | null
          created_at?: string | null
          farm_location?: string | null
          farm_size?: string | null
          farming_experience?: string | null
          farming_goals?: string | null
          full_name?: string | null
          id?: string
          interested_services?: string | null
          investment_budget?: string | null
          languages_spoken?: string | null
          nida_number?: string | null
          passport_number?: string | null
          phone?: string | null
          preferred_contact_method?: string | null
          preferred_crop?: string | null
          social_media?: string | null
          updated_at?: string | null
          website?: string | null
        }
        Relationships: []
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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
