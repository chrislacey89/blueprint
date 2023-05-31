import { NextResponse, NextRequest } from 'next/server'
import {
  PrismaClient,
  Level2Assessment,
  Assessment,
  Content,
  Section,
  Answer,
  Question,
  QuestionDomain
} from '@prisma/client'
// type definitions - in a bigger project these would be in a separate file
interface QuestionResponse {
  value: number | null;
  question_id: string;
  prompt: string;
}
const db = new PrismaClient()
interface AssessmentRequest {
  answers: QuestionResponse[];
}

export type AssessmentData = Assessment & {
  content: Content & {
    sections: (Section & {
      answers: Answer[];
      questions: Question[];
    })[];
  };
};

// end type definitions
export async function GET () {
  const assessmentData = await db.assessment.findUnique({
    where: { id: 'abcd-123' },
    include: {
      content: {
        include: {
          sections: {
            include: {
              answers: true,
              questions: true
            }
          }
        }
      }
    }
  })

  return NextResponse.json(assessmentData)
}

export async function POST (request: NextRequest) {
  const { answers }: AssessmentRequest = await request.json()

  const [level2Assessments, questionDomains] = await Promise.all([
    await db.level2Assessment.findMany(),
    await db.questionDomain.findMany()
  ])
  const questionDomainMapping = mapQuestionDomains(questionDomains)
  const level2AssessmentMapping = mapAssessments(level2Assessments)
  const scores = calculateScores(answers, questionDomainMapping)

  const results = calculateResults(scores, level2AssessmentMapping)

  return NextResponse.json({ results })
}

// Depending on how reusable these functions are, they could be moved to a
// separate file and imported where needed.
interface Level2AssessmentMapping {
  [key: string]: { score: number; assessment: string };
}

function mapAssessments (assessments: Level2Assessment[]) {
  const assessmentMapping: Level2AssessmentMapping = {}

  for (const item of assessments) {
    const { domain, score, assessment } = item
    assessmentMapping[domain] = { score, assessment }
  }

  return assessmentMapping
}

interface QuestionDomainMapping {
  [key: string]: string;
}
function mapQuestionDomains (questionDomains: QuestionDomain[]) {
  const questionDomainMapping: QuestionDomainMapping = {}

  for (const item of questionDomains) {
    const { question, domain } = item
    questionDomainMapping[question] = domain
  }

  return questionDomainMapping
}

function calculateScores (
  answers: QuestionResponse[],
  questionDomainMapping: QuestionDomainMapping
) {
  const scores: { [key: string]: number } = {}
  for (const answer of answers) {
    const domain = questionDomainMapping[answer.question_id]
    if (scores[domain]) {
      scores[domain] += answer.value ?? 0
    } else {
      scores[domain] = answer.value ?? 0
    }
  }

  return scores
}

function calculateResults (
  scores: { [key: string]: number },
  level2AssessmentMapping: Level2AssessmentMapping
) {
  const results: string[] = []
  for (const domain in scores) {
    if (scores[domain] >= level2AssessmentMapping[domain].score) {
      // If the assessment is already in the results, skip it
      if (results.includes(level2AssessmentMapping[domain].assessment)) {
        continue
      }
      results.push(level2AssessmentMapping[domain].assessment)
    }
  }

  return results
}
