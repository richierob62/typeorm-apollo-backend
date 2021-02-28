import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, ID, ObjectType, Root } from 'type-graphql';

import { Comment } from './Comment';
import { User } from './User';
import { Vote } from './Vote';

@ObjectType()
@Entity()
export class Post extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column({ type: 'varchar', length: '255' })
  title: string;

  @Field(() => String)
  @Column({ type: 'text', nullable: true })
  body: string | null;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.posts, { onDelete: 'CASCADE' })
  user: User;

  @Field(() => [Comment])
  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];

  @Field(() => [Vote])
  @OneToMany(() => Vote, (vote) => vote.post)
  votes: Vote[];

  // Calculated fields
  @Field(() => Number)
  numVotes(@Root() parent: Post) {
    return parent.votes.length;
  }
}
