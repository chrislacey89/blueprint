const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main () {
  // Define sample assessment data
  const assessmentDataExample = {
    id: 'abcd-123',
    name: 'BPDS',
    disorder: 'Cross-Cutting',
    full_name: 'Blueprint Diagnostic Screener',
    content: {
      display_name: 'BDS',
      sections: [
        {
          type: 'standard',
          title:
            'During the past TWO (2) WEEKS, how much (or how often) have you been bothered by the following problems?',
          answers: [
            {
              title: 'Not at all',
              value: 0
            },
            {
              title: 'Rare, less than a day or two',
              value: 1
            },
            {
              title: 'Several days',
              value: 2
            },
            {
              title: 'More than half the days',
              value: 3
            },
            {
              title: 'Nearly every day',
              value: 4
            }
          ],
          questions: [
            {
              question_id: 'question_a',
              title: 'Little interest or pleasure in doing things?'
            },
            {
              question_id: 'question_b',
              title: 'Feeling down, depressed, or hopeless?'
            },
            {
              question_id: 'question_c',
              title:
                'Sleeping less than usual, but still have a lot of energy?'
            },
            {
              question_id: 'question_d',
              title:
                'Starting lots more projects than usual or doing more risky things than usual?'
            },
            {
              question_id: 'question_e',
              title:
                'Feeling nervous, anxious, frightened, worried, or on edge?'
            },
            {
              question_id: 'question_f',
              title: 'Feeling panic or being frightened?'
            },
            {
              question_id: 'question_g',
              title: 'Avoiding situations that make you feel anxious?'
            },
            {
              question_id: 'question_h',
              title:
                'Drinking at least 4 drinks of any kind of alcohol in a single day?'
            }
          ]
        }
      ]
    }
  }

  // Create the Assessment data
  await prisma.assessment.create({
    data: {
      id: assessmentDataExample.id,
      name: assessmentDataExample.name,
      disorder: assessmentDataExample.disorder,
      full_name: assessmentDataExample.full_name,
      content: {
        create: {
          display_name: assessmentDataExample.content.display_name,
          sections: {
            create: assessmentDataExample.content.sections.map((section) => ({
              type: section.type,
              title: section.title,
              answers: {
                create: section.answers.map((answer) => ({
                  title: answer.title,
                  value: answer.value
                }))
              },
              questions: {
                create: section.questions.map((question) => ({
                  question_id: question.question_id,
                  title: question.title
                }))
              }
            }))
          }
        }
      }
    }
  })

  // Define question domain mapping
  const questionDomainMapping = {
    question_a: 'depression',
    question_b: 'depression',
    question_c: 'mania',
    question_d: 'mania',
    question_e: 'anxiety',
    question_f: 'anxiety',
    question_g: 'anxiety',
    question_h: 'substance_use'
  }

  // Seed the question domain mapping data
  for (const [question, domain] of Object.entries(questionDomainMapping)) {
    await prisma.questionDomain.create({
      data: {
        question,
        domain
      }
    })
  }

  // Define Level 2 assessment mapping
  const level2AssessmentMapping = {
    depression: { score: 2, assessment: 'PHQ-9' },
    mania: { score: 2, assessment: 'ASRM' },
    anxiety: { score: 2, assessment: 'PHQ-9' },
    substance_use: { score: 1, assessment: 'ASSIST' }
  }

  // Seed the Level 2 assessment mapping data
  for (const [domain, { score, assessment }] of Object.entries(
    level2AssessmentMapping
  )) {
    await prisma.level2Assessment.create({
      data: {
        domain,
        score,
        assessment
      }
    })
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
