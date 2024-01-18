import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'

export async function POST(request: Request) {
  const formData = await request.formData()
  const imageName = formData.get('imageName') as string
  const cookieStore = cookies()
  const supabase = createServerComponentClient({ cookies: () => cookieStore })
  const { data: { user } } = await supabase.auth.getUser()
  const userId = user?.id


  const { data, error } = await supabase
    .storage
    .from('images')
    .remove([`${userId}/${imageName}`])

  if (error) {
    return NextResponse.json( { error: error }, { status: 401 })
  } 

  else {
    return NextResponse.json( { data: data }, { status: 200 })
  }
}