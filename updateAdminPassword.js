import "dotenv/config";
import prisma from "./db/db.config.js";
import bcrypt from "bcryptjs";

async function updateAdminPassword() {
  try {
    // Hash the password properly
    const hashedPassword = await bcrypt.hash("123456", 10);
    console.log(hashedPassword,'jdksjd')
    
    // Update admin password
    const admin = await prisma.admin.update({
      where: { email: "admin@gmail.com" },
      data: { password: hashedPassword }
    });

    console.log("Admin password updated successfully for:", admin.email);
  } catch (error) {
    console.error("Error updating admin password:", error);
  } finally {
    await prisma.$disconnect();
  }
}

updateAdminPassword();