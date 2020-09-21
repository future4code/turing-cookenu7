import { textSpanEnd } from "typescript";
import { BaseDatabase } from "./BaseDatabase";
import { UserDatabase } from "./UserDatabase";

export class RecipeDatabase extends BaseDatabase{
    private static TABLE_NAME: string = "recipes"

    public async createRecipe(id: string, title: string, description: string, createdAt: string, userId: string): Promise<void> {
        await this.getConnection()
        .insert({
            id,
            title,
            description,
            createdAt,
            userId
        })
        .into(RecipeDatabase.TABLE_NAME)
    }

    public async getRecipeId(id: string): Promise<any>{
        const result = await this.getConnection()
        .select("*")
        .from(RecipeDatabase.TABLE_NAME)
        .where({id})

        return result[0]
    }

    public async getFeed(userFollowerId: string){
        const result = await this.getConnection().raw(
            `select recipes.id, recipes.title, recipes.description, recipes.createdAt, recipes.userId, user.name
            from recipes
            join user
            on recipes.userId = user.id
            join follows
            on follows.userToFollowId = recipes.userId
            where follows.userFollowerId = "${userFollowerId}"
            order by recipes.createdAt;`
        )
        return result[0]
    }

}