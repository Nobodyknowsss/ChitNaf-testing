-- CreateTable
CREATE TABLE "Pog" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "ticker_symbol" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "color" TEXT NOT NULL,

    CONSTRAINT "Pog_pkey" PRIMARY KEY ("id")
);
