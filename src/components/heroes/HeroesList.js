import React, { useMemo } from "react";
import { getHeroesByPublisher } from "../../selector/getHeroesByPublisher";
import { HeroCard } from "./HeroCard";

export const HeroesList = ({ publisher }) => {
  
  const heroes = useMemo(() => getHeroesByPublisher(publisher), [publisher])
  return (
    <div className="card-columns animate__animated animate__zoomIn animate__faster">
      {heroes.map((h) => (
        <HeroCard key={h.id} {...h} />
      ))}
    </div>
  );
};
