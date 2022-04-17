import { Request, Response } from 'express';
import { AuthenticateDeliveryManUseCase } from './AuthenticateDeliveryManUseCase';

class AuthenticateDeliveryManController {
    async handle(req: Request, res: Response): Promise<Response> {

        const { username, password } = req.body;

        const authenticateDeliveryManUseCase = new AuthenticateDeliveryManUseCase();

        const result = await authenticateDeliveryManUseCase.execute({
          username,
          password
        });

        return res.json(result);
    }
}

export { AuthenticateDeliveryManController };
