import { mount, shallow } from 'enzyme';
import React from 'react';
import { AuthContext } from '../../auth/AuthContext';
import { AppRouter } from '../../routers/AppRouter';


describe('Pruebas en <AppRouter />', () => {
  test('should de mostrar el login si no esta authenticado', () => {
    const context = {
      dispatch: jest.fn(),
      user: {
        logged: false
      }
    }
    const wrapper = mount(
      <AuthContext.Provider value={context}>
        <AppRouter/>
      </AuthContext.Provider>
    )

    expect(wrapper).toMatchSnapshot()

    
  })

  test('should de mostrar el componente marvel si esta autenticado', () => {
    const context = {
      dispatch: jest.fn(),
      user: {
        logged: true,
        name: "Edgar"
      }      
    }

    const wrapper = mount(
      <AuthContext.Provider value={context}>
        <AppRouter/>
      </AuthContext.Provider>
    )

    expect(wrapper.find(".navbar").exists()).toBe(true)
  })
  
  
})
