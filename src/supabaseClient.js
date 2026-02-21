import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://woaifjpsgncvcahwatqf.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndvYWlmanBzZ25jdmNhaHdhdHFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE1OTY1NDQsImV4cCI6MjA4NzE3MjU0NH0.4fw4i2aBt63FDrIXk9IrfRnBU5ipqxdRfZhmxAZ-kq4'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
