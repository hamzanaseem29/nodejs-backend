import bcrypt from "bcryptjs";

async function hashPassword() {
  const hashedPassword = await bcrypt.hash('123456', 10);
  console.log(hashedPassword);
}

hashPassword();
