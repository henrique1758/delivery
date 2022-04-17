import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { prisma } from "../../../../database/prismaClient";

interface IRequest {
  username: string;
  password: string;
}

class AuthenticateDeliveryManUseCase {

    async execute({ username, password }: IRequest) {
      const deliveryMan = await prisma.deliveryMan.findFirst({
        where: {
          username
        }
      });

      if (!deliveryMan) {
        throw new Error("Username or password invalid!");
      }

      const passwordMatch = compare(password, deliveryMan.password);

      if (!passwordMatch) {
        throw new Error("Username or password invalid!");
      }

      const token = sign({ username }, "dab323e86d5a18642b8978ba76f13414", {
        subject: deliveryMan.id,
        expiresIn: "1d"
      });

      return token;
    }
}

export { AuthenticateDeliveryManUseCase };

