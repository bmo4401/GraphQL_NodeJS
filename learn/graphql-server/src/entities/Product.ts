import {
   Entity,
   BaseEntity,
   PrimaryGeneratedColumn,
   Column,
   CreateDateColumn,
   UpdateDateColumn,
   ManyToOne,
} from 'typeorm';
import { User } from './User';

@Entity()
export class Product extends BaseEntity {
   @PrimaryGeneratedColumn()
   id!: number;
   @Column()
   name!: string;
   @Column({ type: 'decimal' })
   price!: number;
   @Column()
   creatorId!: number;
   @ManyToOne(() => User, (user) => user.products)
   creator!: User;
   @CreateDateColumn()
   createdAt!: Date;
   @UpdateDateColumn()
   updatedAt!: Date;
}
