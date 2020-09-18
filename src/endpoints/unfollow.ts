import {Request, Response} from 'express'
import { BaseDatabase } from '../data/BaseDatabase'
import { FollowDatabase } from '../data/FollowDatabase'
import { UserDatabase } from '../data/UserDatabase'
import { Authenticator } from '../services/Authenticator'

export const unfollow = async(req: Request, res: Response): Promise<void> => {
    try {
        const token = req.headers.authorization as string
        
        const authenticator = new Authenticator()
        const authenticationData = await authenticator.getData(token)

        const userDatabase = new UserDatabase();
        const user = await userDatabase.getUserId(authenticationData.id);

        const unfollowData = {
            userFollowerId: user.id,
            userToFollowId: req.body.userToFollowId
        }

        if(!unfollowData.userToFollowId){
            throw new Error("Insira todas as informações necessárias para o cadastro")
        }

        const userToUnfollowId = new UserDatabase()
        const followId = await userToUnfollowId.getUserId(unfollowData.userToFollowId);

        if (!followId) {
            throw new Error('Usuário não encontrado');
        }

        const checkFollow = await new FollowDatabase().checkFollow(
            user.id,
            unfollowData.userToFollowId
        );

        if (!checkFollow) {
            throw new Error('Você não está seguindo esta pessoa');
        }

        const unfollowDatabase = new FollowDatabase()
        await unfollowDatabase.unFollow(
            unfollowData.userFollowerId,
            unfollowData.userToFollowId
        )

        res.status(200).send({message: "Unfollowed successfully"})
    } catch (error) {
        res.status(400).send({message: error.message})
    }finally{
        await BaseDatabase.destroyConnection()
    }
}