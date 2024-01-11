-- CreateTable
CREATE TABLE "candidates" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "candidates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "candidates_skills" (
    "id" TEXT NOT NULL,
    "skill" TEXT NOT NULL,
    "candidate_id" TEXT NOT NULL,

    CONSTRAINT "candidates_skills_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "candidates_skills" ADD CONSTRAINT "candidates_skills_candidate_id_fkey" FOREIGN KEY ("candidate_id") REFERENCES "candidates"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
