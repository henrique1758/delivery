import { Router } from "express";
import { AuthenticateClientController } from "./modules/account/useCases/authenticateClient/AuthenticateClientController";
import { AuthenticateDeliveryManController } from "./modules/account/useCases/authenticateDeliveryMan/AuthenticateDeliveryManController";
import { CreateClientController } from "./modules/clients/useCases/createClient/CreateClientController";
import { CreateDeliveryManController } from "./modules/deliveryman/useCases/createDeliveryman/CreateDeliveryManController";

const router = Router();

const createClientController = new CreateClientController();
const createDeliveryManController = new CreateDeliveryManController();

const authenticateClientController = new AuthenticateClientController();
const authenticateDeliveryManController = new AuthenticateDeliveryManController();

router.post("/client", createClientController.handle);

router.post("/client/session", authenticateClientController.handle);
router.post("/deliveryman/session", authenticateDeliveryManController.handle);

router.post("/deliveryman", createDeliveryManController.handle);

export { router as routes };

