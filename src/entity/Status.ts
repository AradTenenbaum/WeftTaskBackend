import { Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Status {
  @PrimaryColumn({ nullable: false })
  description: string;
}
