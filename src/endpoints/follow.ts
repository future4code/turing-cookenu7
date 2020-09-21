import {Request, Response} from 'express'
import { BaseDatabase } from '../data/BaseDatabase'
import { FollowDatabase } from '../data/FollowDatabase'
import { Authenticator } from '../services/Authenticator'

export const follow = async (req: Request, res: Response): Promise<void> => {
    try {
        const token = req.headers.authorization as string

        const authenticator = new Authenticator()
        const authenticationData = await authenticator.getData(token)

        const followData = {
            userFollowerId: authenticationData.id,
            userToFollowId: req.body.userToFollowId
        }

        if(!followData.userToFollowId){
            throw new Error("Insira todas as informações necessárias para o cadastro")
        }

        const followDatabase = new FollowDatabase()
        await followDatabase.createFollow(
            followData.userFollowerId,
            followData.userToFollowId
        )

        res.status(200).send({message: "Followed successfully"})

    } catch (error) {
        res.status(400).send({message: error.message})
    } finally{
        await BaseDatabase.destroyConnection()
    }
}