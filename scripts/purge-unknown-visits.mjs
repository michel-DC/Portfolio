import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const VALID_ROUTES = [
  "/",
  "/a-propos",
  "/mes-projets",
  "/politique-de-confidentialite",
  "/mentions-legales",
  "/dashboard",
  "/dashboard/login",
  "/documents/CV-MICHEL.pdf",
  "/documents/MICHEL-DJOUMESSI-ALTERNANCE.pdf",
  "/li",
  "/gh",
  "/in",
  "/sh",
  "/cv",
];

async function purgeInvalidVisits() {
  console.log("🚀 Début du nettoyage de la base de données...");

  try {
    const result = await prisma.visit.deleteMany({
      where: {
        OR: [
          // Condition 1: Données techniques inconnues
          { browser: "Unknown" },
          { os: "Unknown" },
          { device: "Unknown" },
          // Condition 2: Chemins invalides
          {
            AND: [
              { path: { notIn: VALID_ROUTES } },
              { path: { not: { startsWith: "/mes-projets/" } } },
            ],
          },
        ],
      },
    });

    console.log(`✅ Nettoyage terminé ! ${result.count} entrées supprimées.`);
  } catch (error) {
    console.error("❌ Erreur lors du nettoyage :", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

purgeInvalidVisits();
