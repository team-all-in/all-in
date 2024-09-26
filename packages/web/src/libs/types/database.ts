export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      'all-in-relation': {
        Row: {
          created_at: string;
          discord_member_id: string | null;
          id: number;
          slack_member_id: string | null;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          discord_member_id?: string | null;
          id?: number;
          slack_member_id?: string | null;
          user_id: string;
        };
        Update: {
          created_at?: string;
          discord_member_id?: string | null;
          id?: number;
          slack_member_id?: string | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'all-in-relation_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: true;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      discord_settings: {
        Row: {
          created_at: string;
          id: number;
          member_id: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: number;
          member_id?: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          id?: number;
          member_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'discord_settings_user_id_fkey1';
            columns: ['user_id'];
            isOneToOne: true;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      github_settings: {
        Row: {
          created_at: string;
          encrypt_pat_token: string | null;
          id: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          encrypt_pat_token?: string | null;
          id?: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          encrypt_pat_token?: string | null;
          id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'github_settings_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: true;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      messages: {
        Row: {
          app: string;
          channel_id: string | null;
          created_at: string;
          id: string;
          message_id: string;
          message_link: string | null;
          priority: number | null;
          send_at: string | null;
          sentiment: string | null;
          server_id: string | null;
          user_id: string;
        };
        Insert: {
          app: string;
          channel_id?: string | null;
          created_at?: string;
          id?: string;
          message_id: string;
          message_link?: string | null;
          priority?: number | null;
          send_at?: string | null;
          sentiment?: string | null;
          server_id?: string | null;
          user_id: string;
        };
        Update: {
          app?: string;
          channel_id?: string | null;
          created_at?: string;
          id?: string;
          message_id?: string;
          message_link?: string | null;
          priority?: number | null;
          send_at?: string | null;
          sentiment?: string | null;
          server_id?: string | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'messages_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      slack_settings: {
        Row: {
          access_token: string;
          created_at: string;
          id: number;
          member_id: string;
          refresh_token: string;
          user_id: string;
        };
        Insert: {
          access_token: string;
          created_at?: string;
          id?: number;
          member_id?: string;
          refresh_token: string;
          user_id: string;
        };
        Update: {
          access_token?: string;
          created_at?: string;
          id?: number;
          member_id?: string;
          refresh_token?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'slack_settings_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
    };
    Views: {
      user_relation: {
        Row: {
          discord_member_id: string | null;
          email: string | null;
          slack_member_id: string | null;
          user_id: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'all-in-relation_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: true;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    ? (PublicSchema['Tables'] & PublicSchema['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends keyof PublicSchema['Enums'] | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
    ? PublicSchema['Enums'][PublicEnumNameOrOptions]
    : never;
