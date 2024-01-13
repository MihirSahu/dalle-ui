import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import OpenAI from 'openai'
import { Image, ImageGenerateParams } from 'openai/resources/images.mjs'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import {decode} from 'base64-arraybuffer'
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: Request) {
  // Receive the prompt, size, and n from the client
  const formData = await request.formData()
  const prompt = String(formData.get('prompt'))
  const size = String(formData.get('size'))
  const imageCount = String(formData.get('imageCount'))

  const cookieStore = cookies()
  const supabase = createServerComponentClient({ cookies: () => cookieStore })
  const { data: { user } } = await supabase.auth.getUser()
  const userId = user?.id

  const { data, error } = await supabase
    .from(`openai_keys`)
    .select('key')
    .eq('user_id', userId)

  if (error) {
    return NextResponse.json( { error: error }, { status: 401 })
  } 

  else if (data.length === 0){
    return NextResponse.json( { error: "No API key found" }, { status: 401 })
  }

  else {
    const openai = new OpenAI({ apiKey: data[0].key})
    const openai_response = await openai.images.generate({
      model: 'dall-e-2',
      prompt: prompt,
      size: size as ImageGenerateParams['size'],
      n: parseInt(imageCount),
      response_format: 'b64_json'
    })

    const bucketData = await supabase
      .storage
      .from('images')
      .upload(`${userId}/${uuidv4()}.jpeg`, decode(openai_response.data[0].b64_json as string), {
        cacheControl: '3600',
        upsert: false
    })

    if (bucketData.error) {
      return NextResponse.json( { error: bucketData.error }, { status: 401 })
    }

    return NextResponse.json( { data: openai_response }, { status: 200 })
  }
}