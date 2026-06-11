import express from 'express';
import { postPeliculas, getPeliculas, getSinPeli, putPeliculas, getPersoPeli, delePeliculas } from "../controllers/controllerPeliculas.js";

const router = express.Router();

router.get('/getPeli', getPeliculas),
router.post('/getSinglePeli', getSinPeli),
router.post('/getPeliPerso', getPersoPeli),
router.post('/postPeli', postPeliculas),
router.put('/putPeli', putPeliculas),
router.delete('/delePeli', delePeliculas)


export default router