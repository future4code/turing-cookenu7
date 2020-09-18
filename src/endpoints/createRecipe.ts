import { BaseDatabase } from "../data/BaseDatabase"
import {Request, Response} from 'express'
import dayjs from "dayjs"
import { IdGenerator } from "../services/IdGenerator"
import { RecipeDatabase } from "../data/RecipeDatabase"
import { Authenticator } from "../services/Authenticator"

export const createRecipe = async (req: Request, res: Response): Promise<void> => {
    try {
        const token = req.headers.authorization as string

        const authenticator = new Authenticator()
        const authenticationData = await authenticator.getData(token)

        const recipeData = {
            title: req.body.title,
            description: req.body.description,
            userId: authenticationData.id
        }

        if(!recipeData.title || !recipeData.description){
            throw new Error("Insira todas as informações necessárias para o cadastro")
        }

        const createdAt = dayjs().format("YYYY-MM-DD HH:mm:ss")

        const idGenerator = new IdGenerator()
        const id = idGenerator.generateId()

        const recipeDatabase = new RecipeDatabase()
        await recipeDatabase.createRecipe(
            id,
            recipeData.title,
            recipeData.description,
            createdAt,
            recipeData.userId
        )

        res.status(200).send({message: "Receita criada com sucesso"})

    } catch (error) {
        res.status(400).send({message: error.message})
    } finally{
        await BaseDatabase.destroyConnection()
    }
}