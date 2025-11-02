import { Request, Response } from 'express';

class ExampleController {
	/**
	 * Responds with a simple ping message.
	 * @param {Request} req - The request object.
	 * @param {Response} res - The response object.
	 * @returns {Promise<any>} - A promise that resolves to the response.
	 */
	async ping(req: Request, res: Response): Promise<any> {
		return res.status(200).json({ message: 'Pong!' });
	}
}
export default ExampleController;
