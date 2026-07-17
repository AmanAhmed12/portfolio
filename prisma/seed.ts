import prisma from '../lib/prisma'
import bcrypt from 'bcrypt'

async function main() {
  const password = await bcrypt.hash('admin123', 10);
  
  await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      password: password,
      name: 'Admin',
    },
  });

  const profileCount = await prisma.profile.count();
  if (profileCount === 0) {
    await prisma.profile.create({
      data: {
        name: "M.H. AMAAN AHMED",
        title: "Associate Software Engineer",
        company: "Techcess Business Solutions",
        bio: "Results-driven Software Engineer specialized in Java Spring Boot, Next.js, and Cloud Architecture. High-performing professional with a perfect 4.0 GPA.",
        gpa: "4.0 GPA",
        gpaDesc: "SLIATE Batch Topper. Excellence in Software Engineering & Database Management.",
        cloudTitle: "AWS Cloud",
        cloudDesc: "Hands-on experience with EC2, SQS, and Cloud Architecture."
      }
    });
  }
  console.log("Database seeded with Admin user and default profile.");
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
