import { BackendMethod, remult } from 'remult'
import type express from 'express'
// import type from 'cookie-session'

declare module 'remult' {
  export interface RemultContext {
    request?: express.Request
  }
}

const validUsers = [{name: 'Jungkook'}, {name: 'Ale'}]

export class AuthController {
  @BackendMethod({allowed: true})
  static async signIn(name: string) {
    const user = validUsers.find((user) => user.name === name)
    if (user) {
      const userInfo = {
        id: user.name,
        name: user.name
      }
      remult.user = userInfo;

      if(remult.context.request) {
        remult.context.request.session = {user: userInfo}
      }
 

      return userInfo
    } else {
      throw Error("Invalid user, try 'Jungkook' or 'Ale'")
    }
  }

  @BackendMethod({allowed: true})
  static async signOut() {

    if(remult.context.request){
      delete remult.context.request.session;
    }
    remult.user = undefined

    return undefined

    // remult.context.request!.session = null
    // return undefined
  }
}
