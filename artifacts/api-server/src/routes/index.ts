import { Router, type IRouter } from "express";
import healthRouter from "./health";
import mandiRouter from "./mandi";
import schemesRouter from "./schemes";
import equipmentRouter from "./equipment";
import expensesRouter from "./expenses";
import livestockRouter from "./livestock";
import marketplaceRouter from "./marketplace";
import aiRouter from "./ai";
import weatherRouter from "./weather";
import cropAdvisorRouter from "./crop-advisor";
import dashboardRouter from "./dashboard";

const router: IRouter = Router();

router.use(healthRouter);
router.use(dashboardRouter);
router.use(mandiRouter);
router.use(schemesRouter);
router.use(equipmentRouter);
router.use(expensesRouter);
router.use(livestockRouter);
router.use(marketplaceRouter);
router.use(aiRouter);
router.use(weatherRouter);
router.use(cropAdvisorRouter);

export default router;
