import { PrismaCandidatesRepository } from '../repositories/prisma-candidates-repository'

export class RegisterCandidatesUseCase {
  constructor(private candidatesRepository: PrismaCandidatesRepository) {}

  async execute(data) {
    const skills = data.skills

    const candidate = await this.candidatesRepository.create(data, skills)

    return candidate
  }
}
