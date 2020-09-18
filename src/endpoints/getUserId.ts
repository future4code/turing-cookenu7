import {Request, Response} from 'express'
import { BaseDatabase } from '../data/BaseDatabase'
import { UserDatabase } from '../data/UserDatabase'
import { Authenticator } from '../services/Authenticator'

export const getUserId = async(req: Request, res: Response): Promise<any> => {
    try {
        const token = req.headers.authorization as string

        const authenticator = new Authenticator()
        authenticator.getData(token)

        const id = req.params.id

        const userDatabase = new UserDatabase()
        const user = await userDatabase.getUserId(id)

        if(!user){
            throw new Error('usuário não encontrado')
        }

        res.status(200).send({
            id: user.id,
            name: user.name,
            email: user.email
        })
    } catch (error) {
        res.status(400).send({message: error.message})
    } finally{
        await BaseDatabase.destroyConnection()
    }
}