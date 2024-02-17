'use client';

import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import useSWR from 'swr';

export default function Page() {
  const params = useParams();
  const id = params.id;
  const router = useRouter();
  const fetcher = (url: string) =>
    axios.get(url).then((res) => res.data);
  const { data, error, isLoading } = useSWR(
    `https://pokeapi.co/api/v2/pokemon/${id}`,
    fetcher
  );
  console.log(data);
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error...</div>;

  return (
    <main>
      <h1 className="text-center font-extrabold text-4xl mt-6">
        No.{data.id} {data.name}
      </h1>
      <div className="grid grid-cols-2 w-4/5 mx-auto">
        <div>
          <img
            src={data.sprites.front_shiny}
            alt={data.name}
            className="w-full block mx-auto"
          />
        </div>
        <div className="grid h-full w-full items-center justify-items-center">
          <div className="w-1/2 h-fit">
            <div className="flex w-full justify-center space-x-4 mb-5">
              {data.types.map((type: any, i: number) => {
                return (
                  <img
                    key={i}
                    src={`/types/${type.type.name}.svg`}
                    alt={type.type.name}
                    width={50}
                    height={50}
                  />
                );
              })}
            </div>
            <p className="mb-3 w-full text-center space-x-3">
              {data.types.map((type: any, i: number) => {
                return (
                  <span
                    key={i}
                    className="text-lg font-bold tracking-wide">
                    {type.type.name === 'normal'
                      ? 'ノーマル'
                      : type.type.name === 'fighting'
                      ? 'かくとう'
                      : type.type.name === 'flying'
                      ? 'ひこう'
                      : type.type.name === 'poison'
                      ? 'どく'
                      : type.type.name === 'ground'
                      ? 'じめん'
                      : type.type.name === 'rock'
                      ? 'いわ'
                      : type.type.name === 'bug'
                      ? 'むし'
                      : type.type.name === 'ghost'
                      ? 'ゴースト'
                      : type.type.name === 'steel'
                      ? 'はがね'
                      : type.type.name === 'fire'
                      ? 'ほのお'
                      : type.type.name === 'water'
                      ? 'みず'
                      : type.type.name === 'grass'
                      ? 'くさ'
                      : type.type.name === 'electric'
                      ? 'でんき'
                      : type.type.name === 'psychic'
                      ? 'エスパー'
                      : type.type.name === 'ice'
                      ? 'こおり'
                      : type.type.name === 'dragon'
                      ? 'ドラゴン'
                      : type.type.name === 'dark'
                      ? 'あく'
                      : type.type.name === 'fairy'
                      ? 'フェアリー'
                      : ''}
                  </span>
                );
              })}
            </p>
            {data.stats.map((stat: any, i: number) => {
              return (
                <div key={i}>
                  <div className="flex items-center justify-between space-y-4">
                    <p className="text-lg font-bold tracking-wide">
                      {stat.stat.name === 'hp'
                        ? 'HP'
                        : stat.stat.name === 'attack'
                        ? 'こうげき'
                        : stat.stat.name === 'defense'
                        ? 'ぼうぎょ'
                        : stat.stat.name ===
                          'special-attack'
                        ? 'とくこう'
                        : stat.stat.name ===
                          'special-defense'
                        ? 'とくぼう'
                        : stat.stat.name === 'speed'
                        ? 'すばやさ'
                        : ''}
                    </p>
                    <p className="text-lg font-bold tracking-wide">
                      {stat.base_stat}
                    </p>
                  </div>
                  <Progress
                    value={Number(`${stat.base_stat}`)}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Button className='w-fit block mx-auto' onClick={() => router.back()}>
        一覧へ戻る
      </Button>
    </main>
  );
}
