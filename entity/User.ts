import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Field, ObjectType, Root } from 'type-graphql';
import properCase from '../utils/proper_case';
import { Post } from './Post';
import { Vote } from './Vote';
import { Comment } from './Comment';

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => String)
  @Column({ type: 'varchar', length: '100' })
  @PrimaryColumn()
  id: string;

  @Field(() => String, { nullable: true })
  @Column({ type: 'varchar', length: '100', nullable: true })
  firstName: string | null;

  @Field(() => String, { nullable: true })
  @Column({ type: 'varchar', length: '100', nullable: true })
  lastName: string | null;

  @Column({ type: 'boolean', default: false })
  account_locked: boolean;

  // Calculated fields
  @Field(() => String)
  fullName(@Root() parent: User): string {
    const first = properCase(parent.firstName || '').trim();
    const last = properCase(parent.lastName || '').trim();
    return (first || '') + (last ? ` ${last}` : '');
  }

  // Relations
  @Field(() => [Post])
  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @Field(() => [Vote])
  @OneToMany(() => Vote, (vote) => vote.user)
  votes: Vote[];

  @Field(() => [Comment])
  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];
}
