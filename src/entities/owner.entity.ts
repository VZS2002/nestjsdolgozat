import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class Owner {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

  @Column()
  business: boolean;
}
