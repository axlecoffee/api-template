import path from 'path';
import conf from '../config.json';

const config = {
	db: {
		uri: conf.databaseUri,
	},
};

export default config;
