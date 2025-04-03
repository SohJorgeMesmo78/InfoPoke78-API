-- CreateTable
CREATE TABLE "PokemonJogo" (
    "pokemonId" INTEGER NOT NULL,
    "jogoId" INTEGER NOT NULL,

    CONSTRAINT "PokemonJogo_pkey" PRIMARY KEY ("pokemonId","jogoId")
);

-- AddForeignKey
ALTER TABLE "PokemonJogo" ADD CONSTRAINT "PokemonJogo_pokemonId_fkey" FOREIGN KEY ("pokemonId") REFERENCES "Pokemon"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PokemonJogo" ADD CONSTRAINT "PokemonJogo_jogoId_fkey" FOREIGN KEY ("jogoId") REFERENCES "Jogo"("id") ON DELETE CASCADE ON UPDATE CASCADE;
