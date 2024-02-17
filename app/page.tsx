'use client';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { getAllPokemon, getPokemon } from '@/utils/pokemon';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Home() {
  const [loading, setLoading] = useState<Boolean>(true);
  const [pokemonData, setPokemonData] = useState<any[]>([]);
  const [prevUrl, setPrevUrl] = useState<string>('');
  const [nextUrl, setNextUrl] = useState<string>('');
  useEffect(() => {
    const fetchData = async () => {
      let res: any = await getAllPokemon(
        'https://pokeapi.co/api/v2/pokemon'
      );
      loadPokemon(res.results);
      setPrevUrl(res.previous);
      setNextUrl(res.next);
      setLoading(false);
    };
    fetchData();
  }, []);
  const loadPokemon = async (data: any[]) => {
    const _pokemonData = await Promise.all(
      data.map(async (pokemon: { url: string }) => {
        let pokemonRecord = await getPokemon(pokemon.url);
        return pokemonRecord;
      })
    );
    setPokemonData(_pokemonData);
  };

  console.log(pokemonData);

  const handlePrevPage = async () => {
    if (!prevUrl) return;
    setLoading(true);
    let res: any = await getAllPokemon(prevUrl);
    await loadPokemon(res.results);
    setNextUrl(res.next);
    setPrevUrl(res.previous);
    setLoading(false);
  };
  const handleNextPage = async () => {
    setLoading(true);
    let res: any = await getAllPokemon(nextUrl);
    await loadPokemon(res.results);
    setNextUrl(res.next);
    setPrevUrl(res.previous);
    setLoading(false);
  };

  return (
    <main className="min-h-screen w-screen p-4">
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <h1 className="font-extrabold text-4xl text-center">
            Shiny Pokédex
          </h1>
          <div className="grid grid-cols-6 gap-3 w-4/5 mx-auto justify-center items-center mt-6">
            {pokemonData.map((pokemon: any, i: number) => {
              return (
                <Card key={i} className="w-full py-2 px-3">
                  <p className="font-semibold text-lg tracking-wider">
                    No.{pokemon.id}
                  </p>
                  <Link href={`/pokemon/${pokemon.id}`}>
                    <img
                      className="mx-auto block"
                      src={pokemon.sprites.front_shiny}
                      alt={pokemon.name}
                    />
                    <div className="w-fit mx-auto">
                      {pokemon.types.map(
                        (type: any, i: number) => {
                          return (
                            <Badge
                              variant={'outline'}
                              key={i}>
                              {type.type.name}
                            </Badge>
                          );
                        }
                      )}
                    </div>
                    <p className="font-semibold text-lg tracking-wider text-center pb-2">
                      {pokemon.name}
                    </p>
                  </Link>
                </Card>
              );
            })}
            <Button onClick={handlePrevPage}>前へ</Button>
            <Button onClick={handleNextPage}>次へ</Button>
          </div>
        </>
      )}
    </main>
  );
}
