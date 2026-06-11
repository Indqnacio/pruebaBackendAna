import express from 'express';
import { postPeliculas, getPeliculas, getSinPeli, putPeliculas, getPersoPeli, delePeliculas } from "../controllers/controllerPeliculas.js";
import { delePlanetas, putPlanetas, getPersoPlane, getSinPlaneta, getPlanetas,postPlaneta } from '../controllers/controllerPlaneta.js';
import { delEspecie, putEspecie, getPersoEspe, getSinEspecie, getEspecies,postEspecie } from '../controllers/controllerEspecie.js';

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

router.get('/getEspecies', getEspecies),
router.post('/getSingleEspecie', getSinEspecie),
router.get('/getEspeciePerso', getPersoEspe),
router.post('/postEspecie',postEspecie),
router.put('/putEspecie',putEspecie),
router.delete('/deleEspecie', delEspecie)

export default router