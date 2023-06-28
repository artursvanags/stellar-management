export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  user_data: {
    Tables: {
      filament_log: {
        Row: {
          filament_id: string
          id: string
          print_job_id: string
          weight_used: number
        }
        Insert: {
          filament_id: string
          id?: string
          print_job_id: string
          weight_used: number
        }
        Update: {
          filament_id?: string
          id?: string
          print_job_id?: string
          weight_used?: number
        }
        Relationships: [
          {
            foreignKeyName: "filament_log_filament_id_fkey"
            columns: ["filament_id"]
            referencedRelation: "filaments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "filament_log_print_job_id_fkey"
            columns: ["print_job_id"]
            referencedRelation: "print_job"
            referencedColumns: ["id"]
          }
        ]
      }
      filaments: {
        Row: {
          color: string | null
          created_at: string
          id: string
          last_used: string | null
          leftover_weight: number | null
          manufacturer: string | null
          material: string | null
          state: string | null
          stock_weight: number | null
          tags: string | null
          user_id: string
        }
        Insert: {
          color?: string | null
          created_at?: string
          id?: string
          last_used?: string | null
          leftover_weight?: number | null
          manufacturer?: string | null
          material?: string | null
          state?: string | null
          stock_weight?: number | null
          tags?: string | null
          user_id: string
        }
        Update: {
          color?: string | null
          created_at?: string
          id?: string
          last_used?: string | null
          leftover_weight?: number | null
          manufacturer?: string | null
          material?: string | null
          state?: string | null
          stock_weight?: number | null
          tags?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "filaments_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      files: {
        Row: {
          created_at: string
          filename: string | null
          id: string
          last_used: string | null
          origin: string | null
          user_id: string
          weight: number | null
        }
        Insert: {
          created_at?: string
          filename?: string | null
          id?: string
          last_used?: string | null
          origin?: string | null
          user_id: string
          weight?: number | null
        }
        Update: {
          created_at?: string
          filename?: string | null
          id?: string
          last_used?: string | null
          origin?: string | null
          user_id?: string
          weight?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "files_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      print_job: {
        Row: {
          created_at: string
          file_id: string
          id: string
          printer_id: string
          total_weight: number
          user_id: string
        }
        Insert: {
          created_at?: string
          file_id: string
          id?: string
          printer_id: string
          total_weight: number
          user_id: string
        }
        Update: {
          created_at?: string
          file_id?: string
          id?: string
          printer_id?: string
          total_weight?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "print_job_file_id_fkey"
            columns: ["file_id"]
            referencedRelation: "files"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "print_job_printer_id_fkey"
            columns: ["printer_id"]
            referencedRelation: "printers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "print_job_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      printers: {
        Row: {
          created_at: string
          id: string
          last_filament_used: string | null
          last_used: string | null
          name: string | null
          serial_number: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          last_filament_used?: string | null
          last_used?: string | null
          name?: string | null
          serial_number?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          last_filament_used?: string | null
          last_used?: string | null
          name?: string | null
          serial_number?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "printers_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      storage_location: {
        Row: {
          created_at: string
          id: string
          last_used: string | null
          name: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          last_used?: string | null
          name?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          last_used?: string | null
          name?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "storage_location_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      storage_location_filaments: {
        Row: {
          filament_id: string
          storage_location_id: string
        }
        Insert: {
          filament_id: string
          storage_location_id: string
        }
        Update: {
          filament_id?: string
          storage_location_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "storage_location_filaments_filament_id_fkey"
            columns: ["filament_id"]
            referencedRelation: "filaments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "storage_location_filaments_storage_location_id_fkey"
            columns: ["storage_location_id"]
            referencedRelation: "storage_location"
            referencedColumns: ["id"]
          }
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
