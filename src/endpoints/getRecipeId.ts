import {Request, Response} from 'express'
import { BaseDatabase } from '../data/BaseDatabase'
import { RecipeDatabase } from '../data/RecipeDatabase'
import { Authenticator } from '../services/Authenticator'

export const getRecipeId = async(req: Request, res: Response): Promise<any> => {
    try {
        const token = req.headers.authorization as string

        const authenticator = new Authenticator()
        authenticator.getData(token)

        const id = req.params.id

        const recipeDatabase = new RecipeDatabase()
        const recipe = await recipeDatabase.getRecipeId(id)

        if(!recipe){
            throw new Error('Receita não encontrado')
        }

        res.status(200).send({
            id: recipe.id,
            title: recipe.title,
            description: recipe.description,
            createdAt: recipe.createdAt
        })
    } catch (error) {
        res.status(400).send({message: error.message})
    } finally{
        await BaseDatabase.destroyConnection()
    }
}