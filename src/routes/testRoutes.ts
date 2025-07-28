import { Router} from "express";
import { testControler } from "../controllers/testControler.js";

const router:Router = Router();

router.get("/test-user",testControler)

export default router;