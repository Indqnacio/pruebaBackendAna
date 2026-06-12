import express from 'express';
import { postMovies, getMovies, getMovie, putMovie, getMovieCharacter, deleteMovie } from "../controllers/controllerPeliculas.js";
import { deletePlanet, putPlanet, getPlanetsCharacters, getSinglePlanet, getPlanets,postPlanet } from '../controllers/controllerPlaneta.js';
import { deleteSpecie, putSpecie, getSpeciesCharacters, getSpecie, getSpecies,postSpecie } from '../controllers/controllerEspecie.js';
import { postStarship, putStarships, deleteStarship, getStarships, getStarshipsCharacters, getStarship } from '../controllers/controllerNave.js';
import { deleteVehicle, getVehiclesChracters, getVehicle, getVehicles, postVehicle, putVehicle } from '../controllers/controllerVehiculo.js';
import { postCharacter, putCharacter, getCharacters, getCharacter, charactersByName, deleteCharacter } from '../controllers/controllerPersonaje.js';

const router = express.Router();

router.get('/getPeliPerso', getMovieCharacter),
router.get('/getPelis', getMovies),
router.post('/getSinglePeli', getMovie),
router.post('/postPeli', postMovies),
router.put('/putPeli', putMovie),
router.delete('/delePeli', deleteMovie)

router.get('/getPlanetas', getPlanets),
router.post('/getSinglePlane', getSinglePlanet),
router.get('/getPlanetaPerso', getPlanetsCharacters),
router.post('/postPlaneta',postPlanet),
router.put('/putPlaneta',putPlanet),
router.delete('/delePlaneta', deletePlanet),

router.get('/getEspecies', getSpecies),
router.post('/getSingleEspecie', getSpecie),
router.get('/getEspeciePerso', getSpeciesCharacters),
router.post('/postEspecie',postSpecie),
router.put('/putEspecie',putSpecie),
router.delete('/deleEspecie', deleteSpecie)

router.get('/getNaves', getStarships),
router.post('/getNave', getStarship),
router.get('/getNavePerso', getStarshipsCharacters),
router.post('/postNave',postStarship),
router.put('/putNave', putStarships),
router.delete('/deleNave',deleteStarship)

router.get('/getVehiculos', getVehicles),
router.post('/getVehiculo', getVehicle),
router.get('/getVehiculoPerso', getVehiclesChracters),
router.post('/postVehiculo', postVehicle),
router.put('/putVehiculo', putVehicle),
router.delete('/deleteVehiculo', deleteVehicle)

router.get('/getPersonajes', getCharacters)
router.post('/getSinglePersonaje', getCharacter)
router.post('/findByNombre', charactersByName)
router.post('/postPersonaje', postCharacter)
router.put('/putPersonaje',putCharacter)
router.delete('/deletePersonaje', deleteCharacter)


export default router