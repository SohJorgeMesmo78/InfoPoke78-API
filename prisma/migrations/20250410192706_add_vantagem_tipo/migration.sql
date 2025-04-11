-- CreateTable
CREATE TABLE "Vantagem" (
    "tipoAtacanteId" INTEGER NOT NULL,
    "tipoDefensorId" INTEGER NOT NULL,
    "multiplicador" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Vantagem_pkey" PRIMARY KEY ("tipoAtacanteId","tipoDefensorId")
);

-- AddForeignKey
ALTER TABLE "Vantagem" ADD CONSTRAINT "Vantagem_tipoAtacanteId_fkey" FOREIGN KEY ("tipoAtacanteId") REFERENCES "Tipo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vantagem" ADD CONSTRAINT "Vantagem_tipoDefensorId_fkey" FOREIGN KEY ("tipoDefensorId") REFERENCES "Tipo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
