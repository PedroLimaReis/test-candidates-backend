import { Prisma } from '@prisma/client'
import { prisma } from '../lib/prisma'

export class PrismaCandidatesRepository {
  async create(data: Prisma.CandidatesCreateInput, dataSkills: string[]) {
    const candidate = await prisma.candidates.create({
      data: {
        name: data.name,
      },
    })

    dataSkills.map(async (data) => {
      await prisma.candidatesSkills.create({
        data: { candidateId: candidate.id, skill: data },
      })
    })

    return candidate
  }

  async getCandidate(skills) {
    const rawResult = await prisma.$queryRaw`
    SELECT
      "candidates"."id",
      "candidates"."name",
      ARRAY_AGG("candidates_skills"."skill") AS "skills"
    FROM "candidates"
    INNER JOIN "candidates_skills"
      ON "candidates_skills"."candidate_id" = "candidates"."id"
    WHERE "candidates"."id" = (
      SELECT "candidates"."id"
      FROM "candidates"
      INNER JOIN "candidates_skills"
        ON "candidates_skills"."candidate_id" = "candidates"."id"
      WHERE "candidates_skills"."skill" IN (${Prisma.join(skills)})
      GROUP BY "candidates"."id"
      ORDER BY COUNT("candidates_skills"."skill") DESC
      LIMIT 1
    )
    GROUP BY "candidates"."id"
  `

    const candidate = rawResult[0] || null

    return candidate
  }
}
