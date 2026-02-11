-- CreateTable
CREATE TABLE "Visit" (
    "id" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "browser" TEXT NOT NULL,
    "os" TEXT NOT NULL,
    "device" TEXT NOT NULL,
    "ip" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Visit_pkey" PRIMARY KEY ("id")
);
