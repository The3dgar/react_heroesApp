import React from "react";
import "@testing-library/jest-dom";
import { mount } from "enzyme";
import { LoginScreen } from "../../../components/login/LoginScreen";
import { AuthContext } from "../../../auth/AuthContext";
import { types } from "../../../types/types";

describe("Test in <LoginScreen/>", () => {
  const context = {
    dispatch: jest.fn(),
    user: {
      logged: false,
    },
  };

  const history = {
    length: 10,
    goBack: jest.fn(),
    push: jest.fn(),
    replace: jest.fn()
  };

  const wrapper = mount(
    <AuthContext.Provider value={context}>
      <LoginScreen history={history} />
    </AuthContext.Provider>
  );

  test("should displayed correctly", () => {
    expect(wrapper).toMatchSnapshot()

  });


  test('should do dispatch and navigation', () => {
    const handleClick = wrapper.find("button").prop("onClick")


    handleClick()

    expect(context.dispatch).toHaveBeenCalledWith({
      type: types.login,
      payload:{
        name: "Edgar"
      }
    })
    // expect(history.replace).toHaveBeenCalled()
    expect(history.replace).toHaveBeenCalledWith("/")
    localStorage.setItem("lastPath", "/dc")
    handleClick()
    expect(history.replace).toHaveBeenCalledWith("/dc")
  })
  
});
