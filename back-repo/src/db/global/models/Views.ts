import {
	Column,
	CreateDateColumn,
	Entity,
	Index,
	JoinColumn,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import Actions from './Actions';
import ViewsXDepartment from './ViewsXDepartment';

@Entity()
@Index(['name', 'root', 'key'], { unique: true })
export default class Views {
	@PrimaryGeneratedColumn()
	id?: number;

	@Column({ nullable: true })
	name!: string;

	@Column({ nullable: true })
	root!: string;

	@Column({ nullable: false })
	key!: number;

	@OneToMany(() => Actions, (Actions) => Actions.id_views)
	@JoinColumn({ name: 'actions' })
	actions?: Actions[];

	@OneToMany(() => ViewsXDepartment, (ViewsXDepartment) => ViewsXDepartment.id_views)
	@JoinColumn({ name: 'departmentViews' })
	departmentViews?: ViewsXDepartment[];

	@Column({ default: 1 })
	active?: number;

	@CreateDateColumn({ select: false })
	createdAt?: Date;

	@UpdateDateColumn({ select: false })
	updatedAt?: Date;
}
