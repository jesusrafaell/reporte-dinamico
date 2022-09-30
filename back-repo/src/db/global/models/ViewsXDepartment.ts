import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Department from './Department';
import Views from './Views';

@Entity('ViewsXDep')
@Index(['id_department', 'id_views'], { unique: true })
export default class ViewsXDep {
	@PrimaryGeneratedColumn()
	id?: number;

	@ManyToOne(() => Department, (Department) => Department.access_views)
	@JoinColumn({ name: 'id_department' })
	id_department!: Department;

	@ManyToOne(() => Views, (Views) => Views.departmentViews)
	@JoinColumn({ name: 'id_views' })
	id_views!: number;

	@Column({ default: 1 })
	active?: number;
}
