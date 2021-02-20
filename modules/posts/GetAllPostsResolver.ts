import { Query, Resolver, Ctx } from 'type-graphql';
import nookies from 'nookies';

import { Post } from '../../entity/Post';
import { Context } from '../../types/resolver_types';
import { verifyIdToken } from '../../utils/auth/FirebaseAdmin';

@Resolver()
export class GetAllPostsResolver {
  @Query(() => [Post])
  async allPosts(@Ctx() ctx: Context): Promise<Post[]> {
    const cookies = nookies.get(ctx);

    const token = await verifyIdToken(cookies.token);

    console.log('========================');
    console.log('========================');
    console.log(token);
    console.log('========================');
    console.log('========================');

    // const posts = await Post.find({relations: ['user', 'comments', 'votes']});
    const posts = await Post.find();

    return posts;
  }
}
