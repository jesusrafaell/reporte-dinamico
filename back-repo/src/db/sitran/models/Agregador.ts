import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class Agregador {
	@PrimaryGeneratedColumn()
	id?: number;

	@Column({ nullable: false })
	name!: string;

	@Column({ nullable: false })
	key!: number;
}
