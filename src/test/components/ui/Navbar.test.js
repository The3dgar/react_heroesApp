import React from "react";
import { MemoryRouter, Router } from "react-router-dom";
const { mount } = require("enzyme");
import "@testing-library/jest-dom"
import { AuthContext } from "../../../auth/AuthContext";
import { Navbar } from "../../../components/ui/Navbar";
import { types } from "../../../types/types";


describe("test in <Navbar/>", () => {
  // todas estas propiedades son para crear el elemento history, lo unico importante
  // en este caso es el location
  const historyMock = {
    push: jest.fn(),
    location: {},
    listen: jest.fn(),
    createHref: jest.fn(),
    replace: jest.fn()
  }

  const context = {
    dispatch: jest.fn(),
    user: {
      logged: true,
      name: "Edgar",
    },
  };

  const wrapper = mount(
    <AuthContext.Provider value={context}>
      <MemoryRouter>
        <Router history={historyMock}>
          <Navbar />
        </Router>
      </MemoryRouter>
    </AuthContext.Provider>
  );

  afterEach(()=> jest.clearAllMocks())

  test("should displayed correctly", () => {
    expect(wrapper).toMatchSnapshot()
    expect(wrapper.find(".text-info").text().trim()).toBe(context.user.name)
  });

  test("should call logout and use history", () => {
    wrapper.find("button").prop("onClick")()
    expect(context.dispatch).toHaveBeenCalledWith({
      type: types.logout
    })
    expect(historyMock.replace).toHaveBeenCalledWith("/login")
  });
});
