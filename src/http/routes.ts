import express from 'express'
import { registerCandidatesController } from './controllers/register-candidates-controller'
import { getCandidatesController } from './controllers/get-candidates-controller'

const router = express.Router()

router.get('/candidates/search', getCandidatesController)
router.post('/candidates', registerCandidatesController)

export default router
