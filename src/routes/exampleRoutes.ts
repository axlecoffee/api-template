import { Router } from 'express';
import ExampleController from '../controllers/exampleController';

const router = Router();
const exampleController = new ExampleController();

router.get('/ping', (req, res) => exampleController.ping(req, res));

export default router;
