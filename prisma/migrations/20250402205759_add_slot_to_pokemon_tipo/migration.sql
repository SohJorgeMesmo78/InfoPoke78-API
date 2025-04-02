/*
  Warnings:

  - Added the required column `slot` to the `PokemonTipo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PokemonTipo" ADD COLUMN     "slot" INTEGER NOT NULL;
