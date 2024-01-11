import { PrismaCandidatesRepository } from '../repositories/prisma-candidates-repository'
import { CandidateNotExistError } from './errors/candidate-not-exist-error'

export class GetCandidatesUseCase {
  constructor(private candidatesRepository: PrismaCandidatesRepository) {}

  async execute(skills) {
    const cadidate = await this.candidatesRepository.getCandidate(skills)

    if (cadidate === null) {
      throw new CandidateNotExistError()
    }

    return cadidate
  }
}
