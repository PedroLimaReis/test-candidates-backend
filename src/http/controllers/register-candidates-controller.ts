import { Request, Response } from 'express'
import { ZodError, z } from 'zod'
import { PrismaCandidatesRepository } from '../../repositories/prisma-candidates-repository'
import { GetCandidatesUseCase } from '../../use-cases/get-cadidates-use-case'
import { RegisterCandidatesUseCase } from '../../use-cases/register-candidates-use-case'

export async function registerCandidatesController(
  request: Request,
  response: Response,
) {
  try {
    const registerBodySchema = z.object({
      name: z.string(),
      skills: z.array(z.string()),
    })

    const { name, skills } = registerBodySchema.parse(request.body)

    if (name === '' || skills.length === 0) {
      throw new Error('Informações precisam ser passadas')
    }

    const prismaCandidatesRepository = new PrismaCandidatesRepository()

    const registerCandidatesUseCase = new RegisterCandidatesUseCase(
      prismaCandidatesRepository,
    )

    const cadidate = await registerCandidatesUseCase.execute({ name, skills })

    return response.json(cadidate)
  } catch (err) {
    if (err instanceof ZodError) {
      return response.status(409).json({ message: err.message })
    }

    return response.status(500).json({})
  }
}
