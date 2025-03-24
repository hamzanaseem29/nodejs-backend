// import "dotenv/config";
// import prisma from "./db/db.config.js";
// import bcrypt from "bcryptjs";

// async function createAdmin() {
//   try {
//     // Check if admin exists
//     const existingAdmin = await prisma.admin.findUnique({
//       where: { email: "admin@gmail.com" }
//     });

//     if (existingAdmin) {
//       console.log("Admin already exists");
//       return;
//     }

//     // Create new admin
//     const hashedPassword = await bcrypt.hash("123456", 10);
//     const admin = await prisma.admin.create({
//       data: {
//         email: "admin@gmail.com",
//         password: hashedPassword
//       }
//     });

//     console.log("Admin created successfully:", admin.email);
//   } catch (error) {
//     console.error("Error creating admin:", error);
//   } finally {
//     await prisma.$disconnect();
//   }
// }

// createAdmin(); 