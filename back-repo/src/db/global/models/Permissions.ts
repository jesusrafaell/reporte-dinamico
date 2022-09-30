import {
	Entity,
	PrimaryGeneratedColumn,
	JoinColumn,
	ManyToOne,
	Column,
	Index,
	CreateDateColumn,
	UpdateDateColumn,
} from 'typeorm';
import department from './Department';
import actions from './Actions';
import roles from './Roles';

@Entity()
export default class Permissions {
	@PrimaryGeneratedColumn()
	id?: number;

	@ManyToOne(() => department, (department) => department.permissions)
	@JoinColumn({ name: 'id_department' })
	id_department!: department;

	@ManyToOne(() => roles, (roles) => roles.permissions)
	@JoinColumn({ name: 'id_rol' })
	id_rol!: roles;

	@ManyToOne(() => actions, (actions) => actions.permissions)
	@JoinColumn({ name: 'id_action' })
	id_action!: actions;

	@Column({ default: 1 })
	active?: number;

	@CreateDateColumn({ select: false })
	createdAt?: Date;

	@UpdateDateColumn({ select: false })
	updatedAt?: Date;
}
