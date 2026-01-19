import { Connection } from "mongoose";


// promise is connection type 
// we will get connection at the end in promise
declare global{
    var mongoose:{
        conn:Connection | null,
        promise:Promise<Connection> | null
    }
}

export { }