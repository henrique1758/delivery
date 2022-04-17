import { DeliveryMan } from "@prisma/client";
import { hash } from "bcrypt";
import { prisma } from "../../../../database/prismaClient";

interface IRequest {
  username: string;
  password: string;
};

class CreateDeliveryManUseCase {

    async execute({ username, password }: IRequest): Promise<DeliveryMan> {
      const deliveryManAlreadyExists = await prisma.deliveryMan.findFirst({
        where: {
          username: {
            mode: "insensitive"
          }
        }
      });

      if (deliveryManAlreadyExists) {
        throw new Error("DeliveryMan already exists!");
      }

      const hashPassword = await hash(password, 10);

      const deliveryman = await prisma.deliveryMan.create({
        data: {
          username,
          password: hashPassword
        }
      });

      return deliveryman;
    }

}

export { CreateDeliveryManUseCase };

