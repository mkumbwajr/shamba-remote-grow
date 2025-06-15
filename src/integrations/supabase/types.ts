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
      land_plots: {
        Row: {
          availability_status: string | null
          created_at: string
          description: string | null
          electricity_access: boolean | null
          id: string
          images: Json | null
          latitude: number | null
          location: string
          longitude: number | null
          owner_contact: string | null
          owner_name: string | null
          price_per_acre: number
          road_access: boolean | null
          size_acres: number
          soil_type: string | null
          title: string
          total_price: number | null
          updated_at: string
          water_access: boolean | null
        }
        Insert: {
          availability_status?: string | null
          created_at?: string
          description?: string | null
          electricity_access?: boolean | null
          id?: string
          images?: Json | null
          latitude?: number | null
          location: string
          longitude?: number | null
          owner_contact?: string | null
          owner_name?: string | null
          price_per_acre: number
          road_access?: boolean | null
          size_acres: number
          soil_type?: string | null
          title: string
          total_price?: number | null
          updated_at?: string
          water_access?: boolean | null
        }
        Update: {
          availability_status?: string | null
          created_at?: string
          description?: string | null
          electricity_access?: boolean | null
          id?: string
          images?: Json | null
          latitude?: number | null
          location?: string
          longitude?: number | null
          owner_contact?: string | null
          owner_name?: string | null
          price_per_acre?: number
          road_access?: boolean | null
          size_acres?: number
          soil_type?: string | null
          title?: string
          total_price?: number | null
          updated_at?: string
          water_access?: boolean | null
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
      marketplace_products: {
        Row: {
          category: string
          created_at: string
          description: string | null
          id: string
          image_url: string | null
          is_active: boolean | null
          name: string
          price: number
          specifications: Json | null
          stock_quantity: number | null
          updated_at: string
          vendor_contact: string | null
          vendor_name: string | null
        }
        Insert: {
          category: string
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          name: string
          price: number
          specifications?: Json | null
          stock_quantity?: number | null
          updated_at?: string
          vendor_contact?: string | null
          vendor_name?: string | null
        }
        Update: {
          category?: string
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          name?: string
          price?: number
          specifications?: Json | null
          stock_quantity?: number | null
          updated_at?: string
          vendor_contact?: string | null
          vendor_name?: string | null
        }
        Relationships: []
      }
      marketplace_services: {
        Row: {
          category: string
          created_at: string
          description: string | null
          duration_hours: number | null
          id: string
          image_url: string | null
          is_active: boolean | null
          name: string
          price: number
          provider_contact: string | null
          provider_name: string | null
          updated_at: string
        }
        Insert: {
          category: string
          created_at?: string
          description?: string | null
          duration_hours?: number | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          name: string
          price: number
          provider_contact?: string | null
          provider_name?: string | null
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          description?: string | null
          duration_hours?: number | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          name?: string
          price?: number
          provider_contact?: string | null
          provider_name?: string | null
          updated_at?: string
        }
        Relationships: []
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
      platform_settings: {
        Row: {
          category: string | null
          created_at: string
          description: string | null
          id: string
          setting_key: string
          setting_value: Json
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string
          description?: string | null
          id?: string
          setting_key: string
          setting_value: Json
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string
          description?: string | null
          id?: string
          setting_key?: string
          setting_value?: Json
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
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
      service_charges: {
        Row: {
          amount: number
          commission_amount: number | null
          commission_rate: number | null
          created_at: string
          description: string | null
          id: string
          metadata: Json | null
          payment_method: string | null
          service_id: string | null
          service_type: string
          status: string | null
          transaction_reference: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          amount: number
          commission_amount?: number | null
          commission_rate?: number | null
          created_at?: string
          description?: string | null
          id?: string
          metadata?: Json | null
          payment_method?: string | null
          service_id?: string | null
          service_type: string
          status?: string | null
          transaction_reference?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          amount?: number
          commission_amount?: number | null
          commission_rate?: number | null
          created_at?: string
          description?: string | null
          id?: string
          metadata?: Json | null
          payment_method?: string | null
          service_id?: string | null
          service_type?: string
          status?: string | null
          transaction_reference?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          auto_renewal: boolean | null
          billing_cycle: string
          created_at: string
          end_date: string | null
          id: string
          plan_type: string
          price: number
          start_date: string
          status: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          auto_renewal?: boolean | null
          billing_cycle: string
          created_at?: string
          end_date?: string | null
          id?: string
          plan_type: string
          price: number
          start_date?: string
          status?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          auto_renewal?: boolean | null
          billing_cycle?: string
          created_at?: string
          end_date?: string | null
          id?: string
          plan_type?: string
          price?: number
          start_date?: string
          status?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      support_tickets: {
        Row: {
          assigned_to: string | null
          created_at: string
          id: string
          message: string
          priority: string | null
          response: string | null
          status: string | null
          subject: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          assigned_to?: string | null
          created_at?: string
          id?: string
          message: string
          priority?: string | null
          response?: string | null
          status?: string | null
          subject: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          assigned_to?: string | null
          created_at?: string
          id?: string
          message?: string
          priority?: string | null
          response?: string | null
          status?: string | null
          subject?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      workers: {
        Row: {
          availability_status: string | null
          created_at: string
          daily_rate: number | null
          description: string | null
          experience_years: number | null
          hourly_rate: number | null
          id: string
          location: string | null
          name: string
          phone: string | null
          profile_image_url: string | null
          skills: string[] | null
          specialization: string
          updated_at: string
        }
        Insert: {
          availability_status?: string | null
          created_at?: string
          daily_rate?: number | null
          description?: string | null
          experience_years?: number | null
          hourly_rate?: number | null
          id?: string
          location?: string | null
          name: string
          phone?: string | null
          profile_image_url?: string | null
          skills?: string[] | null
          specialization: string
          updated_at?: string
        }
        Update: {
          availability_status?: string | null
          created_at?: string
          daily_rate?: number | null
          description?: string | null
          experience_years?: number | null
          hourly_rate?: number | null
          id?: string
          location?: string | null
          name?: string
          phone?: string | null
          profile_image_url?: string | null
          skills?: string[] | null
          specialization?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      revenue_analytics: {
        Row: {
          avg_transaction_value: number | null
          month: string | null
          service_type: string | null
          total_commission: number | null
          total_revenue: number | null
          transaction_count: number | null
        }
        Relationships: []
      }
      user_activity_summary: {
        Row: {
          country: string | null
          created_at: string | null
          farms_count: number | null
          full_name: string | null
          hired_workers_count: number | null
          id: string | null
          last_transaction_date: string | null
          phone: string | null
          role: Database["public"]["Enums"]["app_role"] | null
          total_spent: number | null
          transactions_count: number | null
        }
        Relationships: []
      }
    }
    Functions: {
      get_user_role: {
        Args: { _user_id: string }
        Returns: Database["public"]["Enums"]["app_role"]
      }
      has_role: {
        Args: {
          _user_id: string
          _role: Database["public"]["Enums"]["app_role"]
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "super_admin" | "admin" | "moderator" | "user"
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
    Enums: {
      app_role: ["super_admin", "admin", "moderator", "user"],
    },
  },
} as const
