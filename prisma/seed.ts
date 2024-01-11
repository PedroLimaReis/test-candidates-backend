import { PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker'

const prisma = new PrismaClient()

const Skills = [
  'javascript',
  'typescript',
  'python',
  'php',
  'ruby',
  'java',
  'c#',
  'c++',
  'rust',
]

const Constants = {
  CandidatesCount: 25,
  MinSkillsCount: 1,
  MaxSkillsCount: 4,
}

const generateCandidate = () => ({
  name: faker.person.fullName(),
  skills: faker.helpers
    .arrayElements(Skills, {
      min: Constants.MinSkillsCount,
      max: Constants.MaxSkillsCount,
    })
    .map((skill) => ({ skill })),
})

const generateCandidates = () =>
  Array.from({ length: Constants.CandidatesCount }, generateCandidate)

async function main() {
  const candidates = await Promise.all(
    generateCandidates().map((candidate) =>
      prisma.candidates.create({
        data: {
          name: candidate.name,
          skills: { createMany: { data: candidate.skills } },
        },
      }),
    ),
  )

  console.log(candidates)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
