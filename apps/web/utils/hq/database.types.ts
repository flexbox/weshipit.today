// Mirrors supabase/migrations. Regenerate with `yarn web:db:types` once the
// migration is live on the linked project.
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
      lead_magnets: {
        Row: {
          bullets: string[];
          content_md: string;
          created_at: string;
          id: string;
          pitch: string;
          published: boolean;
          slug: string;
          title: string;
          updated_at: string;
          views: number;
        };
        Insert: {
          bullets?: string[];
          content_md: string;
          created_at?: string;
          id?: string;
          pitch: string;
          published?: boolean;
          slug: string;
          title: string;
          updated_at?: string;
          views?: number;
        };
        Update: {
          bullets?: string[];
          content_md?: string;
          created_at?: string;
          id?: string;
          pitch?: string;
          published?: boolean;
          slug?: string;
          title?: string;
          updated_at?: string;
          views?: number;
        };
        Relationships: [];
      };
      leads: {
        Row: {
          access_token: string;
          consent_text: string | null;
          created_at: string;
          email: string;
          first_name: string | null;
          id: string;
          lead_magnet_id: string | null;
          marketing_consent: boolean;
          meta: Json;
          referrer: string | null;
          source: string;
          unsubscribe_token: string;
          unsubscribed_at: string | null;
          utm_campaign: string | null;
          utm_medium: string | null;
          utm_source: string | null;
        };
        Insert: {
          access_token?: string;
          consent_text?: string | null;
          created_at?: string;
          email: string;
          first_name?: string | null;
          id?: string;
          lead_magnet_id?: string | null;
          marketing_consent?: boolean;
          meta?: Json;
          referrer?: string | null;
          source: string;
          unsubscribe_token?: string;
          unsubscribed_at?: string | null;
          utm_campaign?: string | null;
          utm_medium?: string | null;
          utm_source?: string | null;
        };
        Update: {
          access_token?: string;
          consent_text?: string | null;
          created_at?: string;
          email?: string;
          first_name?: string | null;
          id?: string;
          lead_magnet_id?: string | null;
          marketing_consent?: boolean;
          meta?: Json;
          referrer?: string | null;
          source?: string;
          unsubscribe_token?: string;
          unsubscribed_at?: string | null;
          utm_campaign?: string | null;
          utm_medium?: string | null;
          utm_source?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'leads_lead_magnet_id_fkey';
            columns: ['lead_magnet_id'];
            isOneToOne: false;
            referencedRelation: 'lead_magnets';
            referencedColumns: ['id'];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      increment_views: {
        Args: { p_slug: string };
        Returns: undefined;
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

export type LeadMagnet = Database['public']['Tables']['lead_magnets']['Row'];
export type Lead = Database['public']['Tables']['leads']['Row'];
