import mongoose from "mongoose";

export const connectionDB = async () => {
    try{
        mongoose.connect(process.env.MONGO_STRING, {dbName: process.env.PROYECT_DB})
        console.log('Conectado a DB')
    }catch (e){
        console.log('Error al conectarse a la DB')
    }
}