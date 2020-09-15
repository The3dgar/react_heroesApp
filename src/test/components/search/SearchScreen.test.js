import { mount } from "enzyme";
import React from "react";
import { MemoryRouter, Route } from "react-router-dom";
import { SearchScreen } from "../../../components/search/SearchScreen";
import "@testing-library/jest-dom"

describe("Test in <SearchScreen/>", () => {
  test("should displayed correctly with default values", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/search"]}>
        <Route path="/search" component={SearchScreen} />
      </MemoryRouter>
    );

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find(".alert-info").text().trim()).toBe("Search a hero ...");
  });

  test("should displayed batman and input with query string param", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/search?q=batman"]}>
        <Route path="/search" component={SearchScreen} />
      </MemoryRouter>
    );

    expect(wrapper.find("input").prop("value")).toBe("batman");
    expect(wrapper).toMatchSnapshot();
  });

  test("should displayed not found results alert", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/search?q=batmans"]}>
        <Route path="/search" component={SearchScreen} />
      </MemoryRouter>
    );

    expect(wrapper.find(".alert-danger").exists()).toBe(true);
  });

  test("should call history push", () => {
    const history = {
      push: jest.fn(),
    };
    const wrapper = mount(
      <MemoryRouter initialEntries={["/search?q=batmans"]}>
        <Route
          path="/search"
          component={() => <SearchScreen history={history} />}
        />
      </MemoryRouter>
    );
    
    wrapper.find("input").simulate("change", {
      target: {
        name: "searchForm",
        value: "superman"
      }
    })

    wrapper.find("form").prop("onSubmit")({preventDefault(){}})

    expect(history.push).toHaveBeenCalledWith("?q=superman")
  });
});
