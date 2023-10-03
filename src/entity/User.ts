import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  Index,
} from "typeorm";
import { Length, IsEmail } from "class-validator";
import { Status } from "./Status";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @Index()
  id: number;

  @Column({ nullable: false })
  @Index()
  name: string;

  @Column({ nullable: false })
  password: string;

  @Column()
  @IsEmail()
  @Index()
  email: string;

  @CreateDateColumn({ default: () => "CURRENT_TIMESTAMP" })
  createdDate: Date;

  @ManyToOne(() => Status, (status) => status.description, { nullable: false })
  status: Status;
}
