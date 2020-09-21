import dotenv from 'dotenv'
import express from 'express'
import { AddressInfo } from 'net'
import { createRecipe } from './endpoints/createRecipe'
import { follow } from './endpoints/follow'
import { getFeedRecipe } from './endpoints/getFeedRecipes'
import { getMyProfile } from './endpoints/getMyProfile'
import { getRecipeId } from './endpoints/getRecipeId'
import { getUserId } from './endpoints/getUserId'
import { login } from './endpoints/login'
import { signup } from './endpoints/signup'
import { unfollow } from './endpoints/unfollow'

dotenv.config()

const app = express()
app.use(express.json())

app.post("/signup", signup)
app.post("/login", login)
app.post("/recipe", createRecipe)
app.post("/user/follow", follow)
app.post("/user/unfollow", unfollow)

app.get("/user/profile", getMyProfile)
app.get("/user/feed",getFeedRecipe)
app.get("/user/:id", getUserId)
app.get("/recipe/:id", getRecipeId)



const server = app.listen(process.env.PORT || 3000, () => {
    if(server){
        const address = server.address() as AddressInfo
        console.log(`Server is running in http://localhost:${address.port}`)
    }else{
        console.error(`Failure upon starting server.`)
    }
})