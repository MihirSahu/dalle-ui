import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'

export async function POST(request: Request) {
  const formData = await request.formData()
  const numImages = parseInt(formData.get('numImages') as string)
  const offset = parseInt(formData.get('offset') as string)
  const cookieStore = cookies()
  const supabase = createServerComponentClient({ cookies: () => cookieStore })
  const { data: { user } } = await supabase.auth.getUser()
  const userId = user?.id

  const urls = await supabase
    .storage
    .from('images')
    .list(`${userId}`, {
      limit: numImages,
      offset: offset,
      sortBy: { column: 'name', order: 'asc' },
    }
  )

  if (urls.error) {
    return NextResponse.json( { error: urls.error }, { status: 401 })
  }

  if (urls.data.length === 0) {
    return NextResponse.json( { data: [] }, { status: 200 })
  }

  const signedUrls = await supabase
    .storage
    .from('images')
    .createSignedUrls(urls.data.map(file => `${userId}/` + file.name), 31622400
  )

  if (signedUrls.error) {
    return NextResponse.json( { error: signedUrls.error }, { status: 401 })
  } 

  else {
    return NextResponse.json( { data: signedUrls.data }, { status: 200 })
  }
}