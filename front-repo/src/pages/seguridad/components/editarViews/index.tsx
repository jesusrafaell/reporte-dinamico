/* eslint-disable react-hooks/exhaustive-deps */
import { useStyles } from './styles/styles';
import { Autocomplete, Button, Checkbox, TextField } from '@mui/material';
import { useState } from 'react';
import { seguridad } from '../../services/seguridad';
import SearchIcon from '@mui/icons-material/Search';
import { handleInfoText, handleLoadingSave } from '../../../../components/swal/alerts';
import { DataGrid, GridColDef, GridSortModel } from '@mui/x-data-grid';
import { Department, View } from '../../interfaces';
import Swal from 'sweetalert2';
import LoaderLine from '../../../../components/loader/LoaderLine';

interface Props {
	listDepartment: Department[];
}

const EditarViews: React.FC<Props> = ({ listDepartment }) => {
	const classes = useStyles();

	const [department, setDepartment] = useState<any>(null);

	const [listViews, setListViews] = useState<View[] | []>([]);

	const [loading, setLoading] = useState(false);

	//console.log('per', listViews);

	const [sortModel, setSortModel] = useState<GridSortModel>([
		{
			field: `id`,
			sort: 'asc',
		},
	]);

	const columns: GridColDef[] = [
		{
			field: 'status',
			headerName: 'Estatus',
			width: 200,
			renderCell: (params) => (
				<Checkbox
					checked={params.row.status}
					onChange={() => {
						if (params.row.name === 'Inicio') {
							Swal.fire('Error', `No se puede inactivar: ${params.row.name}`, 'error');
							return;
						} else {
							handleChange(params.row.id);
						}
					}}
				/>
			),
		},
		{
			field: 'name',
			headerName: 'Nombre',
			width: 200,
		},
	];

	const handleSaveViews = async () => {
		handleLoadingSave();
		if (department && listViews.length) {
			//console.log('buscar', department?.id);
			const res: any = await seguridad.saveViews(department.id, listViews);
			if (res.ok) {
				handleInfoText('Guardado', `Se guardo el cambio de ${department?.name}`);
				setListViews([]);
			}
		}
	};

	const handleChange = (index: number) => {
		listViews.forEach((item, i) => {
			if (item.id === index) {
				listViews[i].status = !listViews[i].status;
			}
		});
	};

	const handleSearchViews = async () => {
		//handleLoadingSearch();
		setLoading(true);
		setListViews([]);
		if (department) {
			//console.log('buscar', department?.id);
			const res: any = await seguridad.getAllListViews(department.id);
			if (res.ok) {
				if (res.permiss.length) {
					setListViews(res.permiss);
				} else handleInfoText('Permisos', 'No existen permisos');
			}
			setLoading(false);
		}
	};

	return (
		<>
			<form className={classes.containerStep} noValidate autoComplete='off'>
				<div className={classes.wrapperGrid}>
					<div>
						<div className={classes.btn_stepM}>
							<Autocomplete
								sx={{
									mr: 1,
								}}
								className={classes.btn_medio}
								onChange={(event, value) => {
									setListViews([]);
									setDepartment(value ? value : null);
								}}
								options={listDepartment}
								getOptionLabel={(value: any) => value.name}
								filterOptions={(listDepartment) =>
									listDepartment.filter((op) => op.active && op.name !== 'Ninguno')
								}
								isOptionEqualToValue={(option: any | null, value: any) => option?.id === value.id}
								value={department || null}
								renderInput={(params: any) => (
									<TextField {...params} name='department' label={`Departamentos`} variant='outlined' />
								)}
							/>
							<Button
								onClick={handleSearchViews}
								disabled={department && !loading ? false : true}
								sx={{
									textTransform: 'none',
									fontSize: '1rem',
								}}
								variant='contained'
								color='primary'>
								<SearchIcon />
							</Button>
						</div>
					</div>
				</div>
				<div style={{ marginTop: '1rem' }}>
					{!listViews.length ? (
						loading ? (
							<LoaderLine />
						) : null
					) : (
						<>
							<div style={{ height: 350 }}>
								<DataGrid
									headerHeight={30}
									rowHeight={25}
									columns={columns}
									sortModel={sortModel}
									onSortModelChange={(model) => setSortModel(model)}
									rows={listViews}
									rowsPerPageOptions={[25, 50, 100]}
								/>
							</div>
							<div className={classes.btn_stepM}>
								<Button
									onClick={handleSaveViews}
									disabled={department ? false : true}
									sx={{
										mt: '1rem',
										textTransform: 'none',
										fontSize: '1rem',
									}}
									variant='contained'
									color='primary'>
									Guardar
								</Button>
							</div>
						</>
					)}
				</div>
			</form>
		</>
	);
};

export default EditarViews;
