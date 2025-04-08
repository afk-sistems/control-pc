import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { createClient, SupabaseClient} from "@supabase/supabase-js";

@Injectable()
export class SupabaseService implements OnModuleInit, OnModuleDestroy{

    private _client:SupabaseClient;

    onModuleInit() {
        this._client = createClient('https://hqsydbqyujajtwncqbwn.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhxc3lkYnF5dWphanR3bmNxYnduIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI0NzU3NzMsImV4cCI6MjA1ODA1MTc3M30.busKsWMVii23fI5Ct1DYmEwhj_w-3munytYgPeoZcxA');
    }

    onModuleDestroy() {
        
    }

    get client():SupabaseClient {
        return this._client;
    }


}
