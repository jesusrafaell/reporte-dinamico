import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	UpdateDateColumn,
	OneToMany,
	JoinColumn,
	CreateDateColumn,
	Index,
} from 'typeorm';
import Permissions from './Permissions';
import ViewsXDepartment from './ViewsXDepartment';

@Entity()
@Index(['name'], { unique: true })
export default class Department {
	@PrimaryGeneratedColumn()
	id?: number;

	@Column({ nullable: true })
	name!: string;

	@OneToMany(() => ViewsXDepartment, (ViewsXDepartment) => ViewsXDepartment.id_department)
	@JoinColumn({ name: 'access_views' })
	access_views?: ViewsXDepartment[];

	@OneToMany(() => Permissions, (Permissions) => Permissions.id_department)
	@JoinColumn({ name: 'permissions' })
	permissions?: Permissions[];

	@Column({ default: 1 })
	active?: number;

	@CreateDateColumn({ select: false })
	createdAt?: Date;

	@UpdateDateColumn({ select: false })
	updatedAt?: Date;
}
