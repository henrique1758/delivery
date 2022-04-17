import { Client } from "@prisma/client";
import { hash } from "bcrypt";
import { prisma } from "../../../../database/prismaClient";

interface IRequest {
  username: string;
  password: string;
}

class CreateClientUseCase {
  
    async execute({ username, password }: IRequest): Promise<Client> {
      const userAlreadyExists = await prisma.client.findFirst({
        where: {
          username: {
            mode: "insensitive"
          }
        }
      });

      if (userAlreadyExists) {
        throw new Error("Client already exists!");
      }

      const hashPassword = await hash(password, 10);

      const client = await prisma.client.create({
        data: {
          username,
          password: hashPassword
        }
      });

      return client;
    }
}

export { CreateClientUseCase };

