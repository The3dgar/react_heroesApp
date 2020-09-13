import { heroes } from "../data/heroes";

export const getHeroByName = (name = "") => {
  if (name === "") return [];
  name = name.toLocaleLowerCase();
  return heroes.filter((h) => h.superhero.toLocaleLowerCase().includes(name));
};
