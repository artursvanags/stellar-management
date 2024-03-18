import { PrismaClient, FilamentStatus } from "@prisma/client";
import { data } from "./data";
const prisma = new PrismaClient();

const filamentData = data;

async function main() {
    const user = await prisma.user.findUnique({
        where: { email: 'arturs.vanags320@gmail.com' },
    });

    if (!user) {
        throw new Error("User not found");
    }

    await prisma.filament.createMany({
        data: filamentData.map(filament => ({
            ...filament,
            diameter: filament.diameter.toString(),
            userId: user.id,
            status: FilamentStatus.new, // Replace FilamentStatus.Undefined with the appropriate value
        })),
    });

    console.log("Filament data seeded.");
}


main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });