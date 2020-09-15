import { mount } from "enzyme";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../../auth/AuthContext";
import { DashboardRouter } from "../../routers/DashboardRouter";

describe("pruebas en <DashboardRoutes/> ", () => {
  const context = {
    dispatch: jest.fn(),
    user: {
      logged: true,
      name: "Petrolina"
    },
  };
  test("should displayed correctly", () => {
    const wrapper = mount(
      <AuthContext.Provider value={context}>
        <MemoryRouter>
          <DashboardRouter />
        </MemoryRouter >
      </AuthContext.Provider>
    );

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find(".text-info").text().trim()).toBe(context.user.name)
  });
});
