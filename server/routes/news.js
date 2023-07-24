import express from 'express';
import {getNews} from '../controllers/users.js';

const router = express.Router();

//READ
router.get("/addednews",getNews); 
export default router;