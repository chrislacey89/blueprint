-- CreateTable
CREATE TABLE "Assessment" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "disorder" TEXT NOT NULL,
    "contentId" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,

    CONSTRAINT "Assessment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Content" (
    "id" TEXT NOT NULL,
    "display_name" TEXT NOT NULL,

    CONSTRAINT "Content_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Section" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "contentId" TEXT NOT NULL,

    CONSTRAINT "Section_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Answer" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "sectionId" TEXT NOT NULL,

    CONSTRAINT "Answer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Question" (
    "id" TEXT NOT NULL,
    "question_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "sectionId" TEXT NOT NULL,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestionDomain" (
    "id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "domain" TEXT NOT NULL,

    CONSTRAINT "QuestionDomain_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Level2Assessment" (
    "id" TEXT NOT NULL,
    "domain" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "assessment" TEXT NOT NULL,

    CONSTRAINT "Level2Assessment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "QuestionDomain_question_key" ON "QuestionDomain"("question");

-- CreateIndex
CREATE UNIQUE INDEX "Level2Assessment_domain_key" ON "Level2Assessment"("domain");

-- AddForeignKey
ALTER TABLE "Assessment" ADD CONSTRAINT "Assessment_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "Content"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Section" ADD CONSTRAINT "Section_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "Content"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "Section"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "Section"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
