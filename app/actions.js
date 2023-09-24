'use server'
 
import { cookies } from 'next/headers'
 
 async function createCookie() {
  cookies().set('name', 'lee')
  console.log(`cookies added`)
}

export {
    createCookie
}
