// import { User } from '../../entity/User';
import { Mutation, Resolver, Arg, Ctx, UseMiddleware } from 'type-graphql';
import { Context } from '../../types/resolver_types';
import { PostInput } from '../../types/type-graphql_types';
import { Post } from '../../entity/Post';
import { isAuthenticated } from '../../middleware/is_authenticated';
import { getCurrentUser } from '../../utils/auth/FirebaseAdmin';

@Resolver()
export class CreatePostResolver {
  @UseMiddleware(isAuthenticated)
  @Mutation(() => Post)
  async createPost(
    @Arg('data') data: PostInput,
    @Ctx() ctx: Context
  ): Promise<Post> {
    const user = await getCurrentUser(ctx);

    if (!user) throw new Error('not authorized');

    const post = Post.create(data);
    post.user = user;

    await post.save();

    return post;
  }
}
