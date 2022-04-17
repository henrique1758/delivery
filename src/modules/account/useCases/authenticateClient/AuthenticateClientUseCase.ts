import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { prisma } from "../../../../database/prismaClient";

interface IRequest {
  username: string;
  password: string;
}

class AuthenticateClientUseCase {

  async execute({ username, password }: IRequest) {
    const client = await prisma.client.findFirst({
      where: { username }
    });

    if (!client) {
      throw new Error("Username or password invalid!");
    }

    const passwordMatch = await compare(password, client.password);

    if (!passwordMatch) {
      throw new Error("Username or password invalid!");
    }

    const token = sign({ username }, "dab323e86d5a18732b8978ba76f13414", {
      subject: client.id,
      expiresIn: "1d"
    });

    return token
  }
  
}

export { AuthenticateClientUseCase };

