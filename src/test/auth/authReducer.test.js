const { authReducer } = require("../../auth/authReducer")
import "@testing-library/jest-dom"
import { types } from "../../types/types"

describe('Pruebas en auth reducer', () => {
  test('should de retornar el estado por defecto', () => {
    const state = authReducer({logged: false}, {})
    expect(state).toEqual({logged: false})
  })
  test('should de autenticar y colocar el nombre', () => {
    const action = {
      type: types.login,
      payload: {
        name: "3dgar"
      }
    }
    const state = authReducer({logged: false}, action)
    expect(state).toEqual({logged: true, name: "3dgar"})
    
  })
  test('debe de borrar el name del usuario y logged en false', () => {
    const action = {
      type: types.logout
    }
    const state = authReducer({logged: true, name: "3dgar"}, action)
    expect(state).toEqual({logged: false})
  })
  
})
