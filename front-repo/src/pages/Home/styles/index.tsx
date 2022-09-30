import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme: Theme) => ({
	base: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		padding: '2rem',
	},
	title: {
		fontSize: 40,
		padding: '1rem 0',
		color: theme.palette.text.primary,
	},
	subtitle: {
		fontSize: 24,
		padding: '1rem',
		color: theme.palette.text.secondary,
	},
}));
