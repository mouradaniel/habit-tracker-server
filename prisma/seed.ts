import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

const firstHabitId = "878515d5-e81d-40e3-afbf-11b51bd5de55"
const firstHabitCreationDate = new Date('2023-02-01T03:00:00.000')

const secondHabitId = "b623c665-9141-4e04-bec9-6672f9d2c54e"
const secondHabitCreationDate = new Date('2023-02-01T03:00:00.000')

const thirdHabitId = "774739b5-85ec-4f7e-adab-14352cf4d021"
const thirdHabitCreationDate = new Date('2023-02-01T03:00:00.000')

async function run() {
  await prisma.habit.deleteMany()
  await prisma.day.deleteMany()
  
  await prisma.habit.create({
    data: {
      id: firstHabitId,
      title: "Practice programming",
      created_at: firstHabitCreationDate,
      weekDays: {
        create: [
          { week_day: 0 }
          { week_day: 1 },
          { week_day: 2 },
          { week_day: 3 },
          { week_day: 4 },
          { week_day: 5 },
          { week_day: 6 },
        ]
      }
    }
  })

  await prisma.habit.create({
    data: {
      id: secondHabitId,
      title: "Practice english",
      created_at: secondHabitCreationDate,
      weekDays: {
        create: [
          { week_day: 0 },
          { week_day: 1 },
          { week_day: 2 },
          { week_day: 3 },
          { week_day: 4 },
          { week_day: 5 },
          { week_day: 6 },
        ]
      }
    }
  })

  await prisma.habit.create({
    data: {
      id: thirdHabitId,
      title: "Prepare class",
      created_at: thirdHabitCreationDate,
      weekDays: {
        create: [
          { week_day: 3 }
        ]
      }
    }
  })

  await Promise.all([
    prisma.day.create({
      data: {
        date: new Date("2023-02-04T03:00:00.000"),
        dayHabits: {
          create: {
            habit_id: firstHabitId
          }
        }
      }
    }),

    prisma.day.create({
      data: {
        date: new Date("2023-02-05T03:00:00.000"),
        dayHabits: {
          create: {
            habit_id: firstHabitId
          }
        }
      }
    }),

    prisma.day.create({
      data: {
        date: new Date("2023-02-06T03:00:00.000"),
        dayHabits: {
          create: [
            { habit_id: firstHabitId },
            { habit_id: secondHabitId },
          ]
        }
      }
    })
  ])
}

run()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })