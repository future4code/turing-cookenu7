import * as bcrypt from 'bcryptjs'

export class HashManager{
    public async hash(password: string): Promise<string>{
        const rounds: number = Number(process.env.BCRYPT_COST)
        const salt: string = await bcrypt.genSalt(rounds)
        const result: string = await bcrypt.hash(password, salt)
        
        return result
    }

    public async compare(password: string, hash: string): Promise<boolean>{
        return await bcrypt.compare(password, hash)
    }
}