import { BackendMethod, remult } from "remult";
import type express from "express";

declare module "remult" {
  export interface RemultContext {
    request?: express.Request;
  }
}

const validUsers = [
  {
    name: "Jungkook",
    admin: true,
  },
  {
    name: "Ale",
    admin: false
  },
];

export class AuthController {
  @BackendMethod({ allowed: true })
  static async signIn(name: string) {
    const user = validUsers.find((user) => user.name === name);
    if (user) {
      const userInfo = {
        id: user.name,
        name: user.name,
        roles: user.admin ? ["admin"] : []
      };
      console.log('Usuario autenticado:', userInfo);
      if (remult.context.request) {
        remult.context.request.session!["user"] = userInfo;
      }
      return userInfo;
    } else {
      throw new Error("Invalid user, try 'Jungkook' or 'Ale'");
    }
  }

  @BackendMethod({ allowed: true })
  static async signOut() {
    if (remult.context.request) {
      remult.context.request.session!["user"] = undefined;
    }
    return undefined;
  }
}
