import React, { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import { HeroCard } from "../heroes/HeroCard";
import queryString from "query-string";
import { getHeroByName } from "../../selector/getHeroByName";

export const SearchScreen = ({ history }) => {
  const location = useLocation();
  const { q = "" } = queryString.parse(location.search);

  const [formValues, handleInputChange] = useForm({
    searchForm: q,
  });
  const { searchForm } = formValues;

  const heroesFilteres = useMemo(() => getHeroByName(q), [q]);

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(`?q=${searchForm}`);
  };

  return (
    <div>
      <h1>Search Screen</h1>
      <hr />
      <div className="row">
        <div className="col-5">
          <h4>Search Form</h4>
          <hr />
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Find your hero"
              className="form-control"
              name="searchForm"
              value={searchForm}
              onChange={handleInputChange}
            />
            <button className="btn btn-outline-primary mt-3 btn-block">
              Search...
            </button>
          </form>
        </div>
        <div className="col-7">
          <h4>Results</h4>
          <hr />

          {q === "" && <div className="alert alert-info">Search a hero ...</div>}
          {(q !== "" && !heroesFilteres.length) && <div className="alert alert-danger">Hero "{q}" not found</div>}

          {heroesFilteres.map((h) => (
            <HeroCard key={h.id} {...h} />
          ))}
        </div>
      </div>
    </div>
  );
};
