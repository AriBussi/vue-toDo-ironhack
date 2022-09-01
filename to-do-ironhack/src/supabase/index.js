import { createClient } from "@supabase/supabase-js";

const supabaseUrl = 'https://boqmlgjcihzvwntanocz.supabase.co';
const supabaseAnonToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJvcW1sZ2pjaWh6dndudGFub2N6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjIwNTA4MjEsImV4cCI6MTk3NzYyNjgyMX0.frWttOseMqQr2z1KGHmw_Ba9SeHD4JODUjovMm5V5PQ';

export default createClient(supabaseUrl, supabaseAnonToken);
