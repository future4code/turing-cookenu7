import {Request, Response} from 'express'
import { BaseDatabase } from '../data/BaseDatabase'
import { UserDatabase } from '../data/UserDatabase'
import { Authenticator } from '../services/Authenticator'

export const getMyProfile = async(req:Request, res: Response): Promise<any> => {
    try {
        const token = req.headers.authorization as string
        
        const authenticator = new Authenticator()
        const authenticationData = await authenticator.getData(token)

        const userDatabase = new UserDatabase()
        const user = await userDatabase.getUserId(authenticationData.id)
        
        if(!user){
            throw new Error("Usuário não encontrado")
        }

        res.status(200).send({id: user.id, email: user.email, name: user.name})


    } catch (error) {
        res.status(400). send({message: error.message})
    } finally{
        await BaseDatabase.destroyConnection()
    }
}