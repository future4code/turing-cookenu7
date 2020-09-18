import {Request, Response} from 'express'
import { BaseDatabase } from '../data/BaseDatabase'
import { RecipeDatabase } from '../data/RecipeDatabase'
import { UserDatabase } from '../data/UserDatabase'
import { Authenticator } from '../services/Authenticator'

export const getFeedRecipe = async(req:Request, res: Response): Promise<any> => {
    try {
        const token = req.headers.authorization as string

        const authenticator = new Authenticator()
        const authenticationData = await authenticator.getData(token)

        const userDatabase = new UserDatabase()
        const user = await userDatabase.getUserId(authenticationData.id)

        const recipeDatabase = new RecipeDatabase()
        const recipeFeed = await recipeDatabase.getFeed(user.id)  

        res.status(200).send(recipeFeed)
    } catch (error) {
        res.status(400).send({message: error.message})
    }finally{
        await BaseDatabase.destroyConnection()
    }
}