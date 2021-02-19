import { Mutation, Resolver, Arg, UseMiddleware } from 'type-graphql';
import { PostUpdateInput } from '../../types/type-graphql_types';
import { Post } from '../../entity/Post';
import { isPostOwner } from '../../middleware/is_post_owner';
import { isAuthenticated } from '../../middleware/is_authenticated';

@Resolver()
export class UpdatePostResolver {
  @UseMiddleware(isAuthenticated)
  @UseMiddleware(isPostOwner)
  @Mutation(() => Post)
  async updatePost(@Arg('data') data: PostUpdateInput): Promise<any> {
    const { id, title, body } = data;

    const stuffToUpdate: any = {};
    if (title) stuffToUpdate.title = title;
    if (body) stuffToUpdate.body = body;

    if (Object.keys(stuffToUpdate).length === 0)
      throw new Error('nothing to update');

    await Post.update({ id }, stuffToUpdate);

    const post = await Post.findOne({ where: { id } });

    return post;
  }
}
