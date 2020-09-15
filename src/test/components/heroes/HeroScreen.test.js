import React from "react";
import { MemoryRouter, Route } from "react-router-dom";
import { HeroesScreen } from "../../../components/heroes/HeroesScreen";
const { mount } = require("enzyme");

describe("Pruebas en <HeroScreen/>", () => {
  const history = {
    length: 10,
    goBack: jest.fn(),
    push: jest.fn(),
  };
  const wrapper = mount(
    <MemoryRouter initialEntries={["/hero"]}>
      <HeroesScreen history={history} />
    </MemoryRouter>
  );

  test("should displayed redirect component without url args", () => {
    expect(wrapper.find("Redirect").exists()).toBe(true);
  });

  test("should displayed hero from param", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/hero/marvel-spider"]}>
        <Route path="/hero/:heroeId" component={HeroesScreen} />
      </MemoryRouter>
    );
    expect(wrapper.find(".row").exists()).toBe(true);
  });

  test("should return to previos screen with push", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/hero/marvel-spider"]}>
        <Route path="/hero/:heroeId" component={HeroesScreen} />
      </MemoryRouter>
    );
    expect(wrapper.find(".row").exists()).toBe(true);
  });

  test("should return to previous screen with push", () => {
    const history = {
      length: 1,
      goBack: jest.fn(),
      push: jest.fn(),
    };

    const wrapper = mount(
      <MemoryRouter initialEntries={["/hero/marvel-spider"]}>
        <Route
          path="/hero/:heroeId"
          component={() => <HeroesScreen history={history} />}
        />
      </MemoryRouter>
    );
    wrapper.find("button").prop("onClick")()

    expect(history.push).toHaveBeenCalledWith("/")
    expect(history.goBack).not.toHaveBeenCalled()
  });

  test("should return to previous screen with goBack", () => {
    const history = {
      length: 3,
      goBack: jest.fn(),
      push: jest.fn(),
    };

    const wrapper = mount(
      <MemoryRouter initialEntries={["/hero/marvel-spider"]}>
        <Route
          path="/hero/:heroeId"
          component={() => <HeroesScreen history={history} />}
        />
      </MemoryRouter>
    );
    wrapper.find("button").prop("onClick")()

    expect(history.goBack).toHaveBeenCalled()
    expect(history.push).not.toHaveBeenCalled()
  });

  test("should call Redirect if heroId do not exist", () => {
    const history = {
      length: 3,
      goBack: jest.fn(),
      push: jest.fn(),
    };

    const wrapper = mount(
      <MemoryRouter initialEntries={["/hero/marvel-spider123"]}>
        <Route
          path="/hero/:heroeId"
          component={() => <HeroesScreen history={history} />}
        />
      </MemoryRouter>
    );

    expect(wrapper.text()).toBe("")

  });
});
