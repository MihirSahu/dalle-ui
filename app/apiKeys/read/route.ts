import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'

export async function POST(request: Request) {
  const formData = await request.formData()
  const model = String(formData.get('model'))
  const cookieStore = cookies()
  const supabase = createServerComponentClient({ cookies: () => cookieStore })
  const { data: { user } } = await supabase.auth.getUser()
  const userId = user?.id

  const { data, error } = await supabase
    .from(`${model.toLowerCase()}_keys`)
    .select('key')
    .eq('user_id', userId)

  if (error) {
    return NextResponse.json( { error: error }, { status: 401 })
  } 

  else {
    if (data.length === 0){
      return NextResponse.json( { error: "No API key found" }, { status: 401 })
    }
    return NextResponse.json( { data: data }, { status: 200 })
  }
}