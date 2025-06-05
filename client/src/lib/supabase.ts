import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://lkzaucnwmpkjcuhqjvhi.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxremF1Y253bXBramN1aHFqdmhpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkxNTMyOTAsImV4cCI6MjA2NDcyOTI5MH0.rJcohGwMF2ICgBqvyLKc0ybnur19RE9OadRb_kfmzds'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)