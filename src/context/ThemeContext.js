import { createContext, useReducer } from 'react'

// Context provider is passing a value into our component which is below (the object with =  value)
// And we can access this value by any component wrapped by the themecontext provider by using the useContext Hook or the customn useTheme hook (in the hooks folder)
export const ThemeContext = createContext()

const themeReducer = (state, action) => {
    switch (action.type) {
        case 'CHANGE_COLOR': 
        return { ...state, color: action.payload }
        case 'CHANGE_MODE' :
            return { ...state, mode: action.payload}
        default:
            return state
    }
}

// This provider function below just wraps our application
export function ThemeProvider({ children }) {

    //Initial state value
    const [state, dispatch] = useReducer(themeReducer, {
        color: '#58248c',
        mode: 'dark'
    })

    // Can call the changeColor function and pass in a new colour.
    // That will fire a dispatch which will specify the type and the payload
    // on the action object and in turn fires the theme reducer function
    // which takes in the current state and the action, we check the action type and if
    // its equal to change colour then we return a new state object with the new colour value, that updates  
    // this state object which we get back from the useReducer hook

    const changeColor = (color) => {
        dispatch({type: 'CHANGE_COLOR', payload: color })
    }

    const changeMode = (mode) => {
        dispatch({type: 'CHANGE_MODE', payload: mode })
    }

    // Custom logic

    return (
        <ThemeContext.Provider value={{ ...state, changeColor, changeMode }}>
            {children}
        </ThemeContext.Provider>
    )
}