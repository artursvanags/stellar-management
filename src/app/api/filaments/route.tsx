import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

import { Database } from '@/types/db'

export async function GET(request: Request): Promise<NextResponse> {
  const supabase = createRouteHandlerClient<Database>({cookies});
  const { data: filaments } = await supabase.from('filaments').select('*')
  return NextResponse.json(filaments, { status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    } })
}