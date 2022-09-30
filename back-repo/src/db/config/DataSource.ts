import { config } from 'dotenv';
import { DataSource } from 'typeorm';
config();

const { HOST, USER, PASS, DB } = process.env;

export const MilpagosDS = new DataSource({
	type: 'mssql',
	host: HOST,
	username: USER,
	password: PASS,
	database: 'milpagos',
	options: {
		encrypt: false,
		cancelTimeout: 15000,
	},
	requestTimeout: 600000,
	connectionTimeout: 30000,
	synchronize: false,
	migrationsRun: false,
	logging: false,
	entities: ['src/db/global/models/**/*.ts'],
	migrations: ['src/db/global/migrations/milpagos/**/*.ts'],
	subscribers: ['src/db/global/subscriber/**/*.ts'],
});

export const CarropagoDS = new DataSource({
	type: 'mssql',
	host: HOST,
	username: USER,
	password: PASS,
	database: 'carropago',
	options: {
		encrypt: false,
		cancelTimeout: 15000,
	},
	requestTimeout: 600000,
	connectionTimeout: 30000,
	synchronize: false,
	migrationsRun: false,
	logging: false,
	entities: ['src/db/global/models/**/*.ts'],
	migrations: ['src/db/global/migrations/carropago/**/*.ts'],
	subscribers: ['src/db/global/subscriber/**/*.ts'],
});

export const LibrepagoDS = new DataSource({
	type: 'mssql',
	host: HOST,
	username: USER,
	password: PASS,
	database: 'librepago',
	options: {
		encrypt: false,
		cancelTimeout: 15000,
	},
	requestTimeout: 600000,
	connectionTimeout: 30000,
	synchronize: false,
	migrationsRun: false,
	logging: false,
	entities: ['src/db/global/models/**/*.ts'],
	migrations: ['src/db/global/migrations/librepago/**/*.ts'],
	subscribers: ['src/db//global/subscriber/**/*.ts'],
});

export const SitranDS = new DataSource({
	type: 'mssql',
	host: HOST,
	username: USER,
	password: PASS,
	database: 'sitran',
	options: {
		encrypt: false,
		cancelTimeout: 15000,
	},
	requestTimeout: 600000,
	connectionTimeout: 30000,
	synchronize: false,
	migrationsRun: false,
	logging: false,
	entities: ['src/db/sitran/models/**/*.ts'],
	migrations: ['src/db/sitran/base/**/*.ts'],
	subscribers: ['src/db/sitran/subscriber/**/*.ts'],
});

export const getDatasource = (agr: string | string[]): DataSource => {
	switch (agr) {
		case '1':
			return CarropagoDS;
		case '2':
			return MilpagosDS;
		case '3':
			return LibrepagoDS;
	}
};
