import express from 'express';
import { postPeliculas, getPeliculas, getSinPeli, putPeliculas, getPersoPeli, delePeliculas } from "../controllers/controllerPeliculas.js";
import { delePlanetas, putPlanetas, getPersoPlane, getSinPlaneta, getPlanetas,postPlaneta } from '../controllers/controllerPlaneta.js';
const router = express.Router();

router.get('/getPeliPerso', getPersoPeli),
router.get('/getPeli', getPeliculas),
router.post('/getSinglePeli', getSinPeli),
router.post('/postPeli', postPeliculas),
router.put('/putPeli', putPeliculas),
router.delete('/delePeli', delePeliculas)

router.get('/getPlaneta', getPlanetas),
router.post('/getSinglePlane', getSinPlaneta),
router.get('/getPlanetaPerso', getPersoPlane),
router.post('/postPlaneta',postPlaneta),
router.put('/putPlaneta',putPlanetas),
router.delete('/delePlaneta', delePlanetas)
export default router