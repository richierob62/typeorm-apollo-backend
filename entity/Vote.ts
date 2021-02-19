import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';

import { Comment } from './Comment';
import { Post } from './Post';
import { User } from './User';
import { VoteType } from '../types/type-graphql_types';

@ObjectType()
@Entity()
export class Vote extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column({ type: 'varchar' })
  type: VoteType;

  // Relations
  @Field(() => Post, { nullable: true })
  @ManyToOne(() => Post, (post) => post.votes, { onDelete: 'CASCADE' })
  post: Post;

  @Field(() => Comment, { nullable: true })
  @ManyToOne(() => Comment, (comment) => comment.votes, { onDelete: 'CASCADE' })
  comment: Comment;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.votes, { onDelete: 'CASCADE' })
  user: User;
}
