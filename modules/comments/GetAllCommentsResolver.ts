import { Query, Resolver } from 'type-graphql';

import { Comment } from '../../entity/Comment';

@Resolver()
export class GetAllCommentsResolver {
  @Query(() => [Comment])
  async allComments(): Promise<Comment[]> {
    const comments = await Comment.find({
      relations: ['user', 'post', 'votes'],
    });

    return comments;
  }
}
