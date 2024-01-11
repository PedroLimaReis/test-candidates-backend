import { Request, Response } from 'express'
import { ZodError, string, z } from 'zod'
import { PrismaCandidatesRepository } from '../../repositories/prisma-candidates-repository'
import { GetCandidatesUseCase } from '../../use-cases/get-cadidates-use-case'
import { CandidateNotExistError } from '../../use-cases/errors/candidate-not-exist-error'

export async function getCandidatesController(
  request: Request,
  response: Response,
) {
  try {
    const getCandidateBodySchema = z.object({
      skills: z.string(),
    })

    const { skills } = getCandidateBodySchema.parse(request.query)

    const prismaCandidatesRepository = new PrismaCandidatesRepository()

    const getCandidatesUseCase = new GetCandidatesUseCase(
      prismaCandidatesRepository,
    )

    const candidate = await getCandidatesUseCase.execute(skills.split(','))

    return response.json(candidate)
  } catch (err) {
    if (err instanceof ZodError || err instanceof CandidateNotExistError) {
      console.log(err.message)
      return response.status(409).json({ message: err.message })
    }

    console.log(err)

    return response.status(500).json({})
  }
}
