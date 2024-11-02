import { UserModel } from "../models/user.model.js"

export default class User {
    
    getUsers = async () => {
        try{
            return await UserModel.find().lean()
        } catch (e){
            console.log(e);
            return null
        }
    }

    getUserById = async (id) => {
        try{
            return await UserModel.findOne({_id: id}).lean()
        } catch (e){
            console.log(e);
            return null
        }
    }

    getUserByEmail = async (mail) => {
        try{
            return await UserModel.findOne({email: mail}).lean()
        } catch (e){
            console.log(e);
            return null
        }
    }

    createUsers = async (user) => {
        try{
            return await UserModel.create(user)
        } catch (e){
            console.log(e);
            return null
        }
    }

    updateUser = async (id, user) => {
        try{
            return await UserModel.updateOne({_id: id}, {$set: user}, {new: true}).lean()
        } catch (e){
            console.log(e);
            return null
        }
    }


}