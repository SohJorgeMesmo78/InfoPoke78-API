-- AlterTable
ALTER TABLE "Jogo" ADD COLUMN     "versaoId" INTEGER;

-- CreateTable
CREATE TABLE "Versao" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "Versao_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Versao_nome_key" ON "Versao"("nome");

-- AddForeignKey
ALTER TABLE "Jogo" ADD CONSTRAINT "Jogo_versaoId_fkey" FOREIGN KEY ("versaoId") REFERENCES "Versao"("id") ON DELETE SET NULL ON UPDATE CASCADE;
