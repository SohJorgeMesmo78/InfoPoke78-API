-- CreateTable
CREATE TABLE "PokemonTipo" (
    "pokemonId" INTEGER NOT NULL,
    "tipoId" INTEGER NOT NULL,

    CONSTRAINT "PokemonTipo_pkey" PRIMARY KEY ("pokemonId","tipoId")
);

-- AddForeignKey
ALTER TABLE "PokemonTipo" ADD CONSTRAINT "PokemonTipo_pokemonId_fkey" FOREIGN KEY ("pokemonId") REFERENCES "Pokemon"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PokemonTipo" ADD CONSTRAINT "PokemonTipo_tipoId_fkey" FOREIGN KEY ("tipoId") REFERENCES "Tipo"("id") ON DELETE CASCADE ON UPDATE CASCADE;
