import express from 'express';
import { postPeliculas, getPeliculas, getSinPeli, putPeliculas, getPersoPeli, delePeliculas } from "../controllers/controllerPeliculas.js";
import { delePlanetas, putPlanetas, getPersoPlane, getSinPlaneta, getPlanetas,postPlaneta } from '../controllers/controllerPlaneta.js';
import { delEspecie, putEspecie, getPersoEspe, getSinEspecie, getEspecies,postEspecie } from '../controllers/controllerEspecie.js';
import { postNave, putNaves, deleNave, getNaves, getPersoNave, getSin_Nave } from '../controllers/controllerNave.js';
import { deleVehiculo, getPerso_Vehi, getSin_Vehi, getVehiculos, postVehiculo, putVehiculos } from '../controllers/controllerVehiculo.js';
import { postPersonaje, putPerso, getPersonajes, getSinglePersonaje, findByNombre, deletePersonaje } from '../controllers/controllerPersonaje.js';

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
router.delete('/delePlaneta', delePlanetas),

router.get('/getEspecies', getEspecies),
router.post('/getSingleEspecie', getSinEspecie),
router.get('/getEspeciePerso', getPersoEspe),
router.post('/postEspecie',postEspecie),
router.put('/putEspecie',putEspecie),
router.delete('/deleEspecie', delEspecie)

router.get('/getNaves', getNaves),
router.post('/getNave', getSin_Nave),
router.get('/getNavePerso', getPersoNave),
router.post('/postNave',postNave),
router.put('/putNave', putNaves),
router.delete('/deleNave',deleNave)

router.get('/getVehiculos', getVehiculos),
router.post('/getVehiculo', getSin_Vehi),
router.get('/getVehiculoPerso', getPerso_Vehi),
router.post('/postVehiculo', postVehiculo),
router.put('/putVehiculo', putVehiculos),
router.delete('/deleteVehiculo', deleVehiculo)

router.get('/getPersonajes', getPersonajes)
router.post('/getSinglePersonaje', getSinglePersonaje)
router.post('/findByNombre', findByNombre)
router.post('/postPersonaje', postPersonaje)
router.put('/putPersonaje',putPerso)
router.delete('/deletePersonaje', deletePersonaje)


export default router