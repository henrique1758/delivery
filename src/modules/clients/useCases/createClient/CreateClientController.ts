import { Request, Response } from 'express';
import { CreateClientUseCase } from './CreateClientUseCase';

class CreateClientController {
    async handle(req: Request, res: Response): Promise<Response> {

        const { username, password } = req.body;

        const createClientUseCase = new CreateClientUseCase();

        const result = await createClientUseCase.execute({
          username, 
          password
        });

        return res.json(result);
    }
}

export { CreateClientController };

