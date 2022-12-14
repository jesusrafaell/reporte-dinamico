import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn } from 'typeorm';

@Entity({ synchronize: false })
export default class Usuarios {
	@PrimaryGeneratedColumn()
	id?: number;

	@Column({ nullable: false })
	login!: string;

	@Column({ nullable: false })
	contrasena!: string;

	@Column({ nullable: false })
	nombre!: string;

	@Column({ nullable: false })
	tipoIdentificacion!: string;

	@Column({ nullable: false })
	identificacion!: string;

	@Column({ nullable: false })
	email!: string;

	@Column({ nullable: false })
	perfilId!: number;

	@Column({ nullable: false })
	fechaCreacion!: Date;

	@Column({ nullable: false })
	fechaExpira?: Date;

	@Column({ nullable: false })
	ultimoAcceso?: Date;

	@Column({ nullable: false })
	estatus!: number;
}
