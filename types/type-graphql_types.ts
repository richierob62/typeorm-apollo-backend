import { Field, InputType } from 'type-graphql';

import { Comment } from '../entity/Comment';
import { MinLength } from 'class-validator';
import { Post } from '../entity/Post';
import { Vote } from '../entity/Vote';

// ts types
export type VoteType = 'comment' | 'post';

// Input Types
@InputType()
export class PostInput implements Partial<Post> {
  @Field()
  @MinLength(3, { message: 'Minimum 3 characters' })
  title: string;

  @Field()
  body: string;
}

@InputType()
export class PostUpdateInput implements Partial<Post> {
  @Field()
  id: number;

  @Field({ nullable: true })
  @MinLength(3, { message: 'Minimum 3 characters' })
  title: string;

  @Field({ nullable: true })
  body: string;
}

@InputType()
export class CommentInput implements Partial<Comment> {
  @Field()
  postId: number;

  @Field()
  body: string;
}

@InputType()
export class CommentUpdateInput implements Partial<Comment> {
  @Field()
  id: number;

  @Field({ nullable: true })
  body: string;
}

@InputType()
export class VoteInput implements Partial<Vote> {
  @Field()
  type: VoteType;

  @Field({ nullable: true })
  postId: number;

  @Field({ nullable: true })
  commentId: number;
}
