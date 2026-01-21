// we are expoerting a module which is next-auth

declare module "next-auth"{
    interface User{
        id:string
        name:string
        email:string
        role:string
    }
}

export {}