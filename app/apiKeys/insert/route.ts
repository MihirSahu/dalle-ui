import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'

export async function POST(request: Request) {
  const requestUrl = new URL(request.url)
  const formData = await request.formData()
  const apiKey = String(formData.get('apiKey'))
  const model = String(formData.get('model'))
  const cookieStore = cookies()
  const supabase = createServerComponentClient({ cookies: () => cookieStore })
  const { data: { user } } = await supabase.auth.getUser()
  const userId = user?.id

  const { error } = await supabase
    .from(`${model.toLowerCase()}_keys`)
    .insert({ user_id: userId, key: apiKey })

  if (error) {
    return NextResponse.json( { error: error }, { status: 401 })
  } 

  else {
    return NextResponse.json({ status: 200 })
  }
}