import { Router } from 'express';
import { getOrdenes } from '../controllers/ordenesController';
export const router=Router()

router.get('/',getOrdenes)