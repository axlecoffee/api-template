import express, { Express } from 'express';
import mongoose from 'mongoose';
import config from './config';
import exampleRoutes from 'routes/exampleRoutes';

const app: Express = express();
const PORT = process.env.PORT || 6657;

/**
 * Connect to the database.
 */

mongoose
	.connect(config.db.uri)
	.then(() => {
		console.log('Database connected successfully');
	})
	.catch((err) => {
		console.error('Database connection error:', err);
	});
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('', exampleRoutes);

/**
 * Start the server.
 */
app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
