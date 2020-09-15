import React from "react";
import "@testing-library/jest-dom";
import { mount } from "enzyme";
import { PrivateRoute } from "../../routers/PrivateRoute";
import { MemoryRouter } from "react-router-dom";

describe("pruebas en <PrivateRoute/>", () => {
  const rest = {
    location: {
      pathname: "/",
    },
  };
  Storage.prototype.setItem =jest.fn()
  test("should de mostrar el componente si esta autenticado y guardar el localstorage", () => {
    const wrapper = mount(
      <MemoryRouter>
        <PrivateRoute
          {...rest}
          isAuthenticated={true}
          component={() => <span>Listo</span>}
        />
      </MemoryRouter>
    );
    expect(wrapper.find("span").exists()).toBe(true)
    expect(localStorage.setItem).toHaveBeenCalledWith("lastPath", "/")
  });

  test('should bloquear el componente si no esta authenticado', () => {
    const wrapper = mount(
      <MemoryRouter>
        <PrivateRoute
          {...rest}
          isAuthenticated={false}
          component={() => <span>Listo</span>}
        />
      </MemoryRouter>
    );

    expect(wrapper.find("span").exists()).toBe(false)
  })
  
});
