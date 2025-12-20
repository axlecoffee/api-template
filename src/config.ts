import 'dotenv/config';

const config = {
	db: {
		uri: process.env.MONGODB_URI || '',
	},
	port: process.env.PORT || 6657,
};

export default config;
