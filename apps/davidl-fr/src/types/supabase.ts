// Mirrors supabase/migrations. Regenerate with `yarn davidl-fr:db:types` once the
// migrations are live on the linked project.
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      bootcamp_onboarding: {
        Row: {
          computer_os: string | null;
          created_at: string;
          email: string;
          full_name: string | null;
          git_confidence: number | null;
          github_username: string | null;
          javascript_confidence: number | null;
          motivation: string | null;
          phone_os: string | null;
          react_experience: number | null;
          setup_done: boolean | null;
        };
        Insert: {
          computer_os?: string | null;
          created_at?: string;
          email: string;
          full_name?: string | null;
          git_confidence?: number | null;
          github_username?: string | null;
          javascript_confidence?: number | null;
          motivation?: string | null;
          phone_os?: string | null;
          react_experience?: number | null;
          setup_done?: boolean | null;
        };
        Update: {
          computer_os?: string | null;
          created_at?: string;
          email?: string;
          full_name?: string | null;
          git_confidence?: number | null;
          github_username?: string | null;
          javascript_confidence?: number | null;
          motivation?: string | null;
          phone_os?: string | null;
          react_experience?: number | null;
          setup_done?: boolean | null;
        };
        Relationships: [];
      };
      challenge: {
        Row: {
          airtable_id: string | null;
          comments: string | null;
          created_at: string;
          email: string;
          exercise: number;
          exercise_rating: number;
          id: string;
          instructions_rating: number;
          learned: string;
          module: string;
        };
        Insert: {
          airtable_id?: string | null;
          comments?: string | null;
          created_at?: string;
          email?: string;
          exercise: number;
          exercise_rating: number;
          id?: string;
          instructions_rating: number;
          learned: string;
          module: string;
        };
        Update: {
          airtable_id?: string | null;
          comments?: string | null;
          created_at?: string;
          email?: string;
          exercise?: number;
          exercise_rating?: number;
          id?: string;
          instructions_rating?: number;
          learned?: string;
          module?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      alumni_count: {
        Args: Record<PropertyKey, never>;
        Returns: number;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};
