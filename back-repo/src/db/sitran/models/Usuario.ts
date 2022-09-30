import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('Usuarios')
export default class UsuariosSitran {
	@PrimaryGeneratedColumn()
	id?: number;

	@Column({ nullable: false })
	login!: string;

	@Column({ nullable: false })
	password!: string;

	@Column({ nullable: false })
	name!: string;

	@Column({ nullable: false })
	id_type!: string;

	@Column({ nullable: false })
	ident!: string;

	@Column({ nullable: false })
	email!: string;

	@Column({ nullable: true })
	expireAt?: Date | null;

	@CreateDateColumn()
	createdAt?: Date;

	@UpdateDateColumn()
	updatedAt?: Date;

	@Column({ nullable: false })
	estatus!: number;
}
