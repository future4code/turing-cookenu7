import { BaseDatabase } from "./BaseDatabase";

export class FollowDatabase extends BaseDatabase{
    private static TABLE_NAME: string = "follows"

    public async createFollow(userFollowerId: string, userToFollowId: string): Promise<void> {
        await this.getConnection()
        .whereNot ({userFollowerId, userToFollowId})
        .insert({
            userFollowerId,
            userToFollowId,
        })
        .into(FollowDatabase.TABLE_NAME)
    }

    public async unFollow(userFollowerId: string, userToFollowId: string): Promise<void> {
        await this.getConnection()
        .where({userFollowerId,userToFollowId})
        .delete()
        .table(FollowDatabase.TABLE_NAME)
    }
    
    public async checkFollow(userFollowerId: string, userToFollowId: string): Promise<any> {
        const result = await this.getConnection()
          .select('*')
          .from(FollowDatabase.TABLE_NAME)
          .where({
            userFollowerId,
            userToFollowId
          });
        return result[0];
      }

}