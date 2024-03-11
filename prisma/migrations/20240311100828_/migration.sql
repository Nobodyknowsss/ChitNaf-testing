/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Pog` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[ticker_symbol]` on the table `Pog` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Pog_name_key" ON "Pog"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Pog_ticker_symbol_key" ON "Pog"("ticker_symbol");
