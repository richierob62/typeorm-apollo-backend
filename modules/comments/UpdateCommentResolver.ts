import { Mutation, Resolver, Arg, UseMiddleware } from 'type-graphql';
import { CommentUpdateInput } from '../../types/type-graphql_types';
import { Comment } from '../../entity/Comment';
import { isCommentOwner } from '../../middleware/is_comment_owner';
import { isAuthenticated } from '../../middleware/is_authenticated';

@Resolver()
export class UpdateCommentResolver {
  @UseMiddleware(isAuthenticated)
  @UseMiddleware(isCommentOwner)
  @Mutation(() => Comment)
  async updateComment(@Arg('data') data: CommentUpdateInput): Promise<any> {
    const { id, body } = data;

    if (!body) throw new Error('nothing to update');

    await Comment.update({ id }, { body });

    const comment = await Comment.findOne({ where: { id } });

    if (!comment) throw new Error('comment not found');

    return comment;
  }
}
