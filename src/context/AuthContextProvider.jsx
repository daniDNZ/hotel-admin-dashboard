import { useReducer, createContext } from 'react';

export const AuthContext = createContext({});

function AuthContextProvider({ children }) {
  const authReducer = (state, action) => {
    switch (action.type) {
      // case 'CHANGE_USER':
      //   return { ...state, username: action.value.username };
      // case 'CHANGE_EMAIL':
      //   return { ...state, email: action.value.email };
      case 'LOGIN':
        localStorage.setItem('AUTH_DATA', JSON.stringify(action.value));
        return {
          status: true,
          email: action.value.email,
          token: action.value.token,
        };
      case 'LOGOUT':
      default:
        return {
          status: false,
          email: '',
          token: '',
        };
    }
  };
  const initialAuth = JSON.parse(localStorage.getItem('AUTH_DATA'));

  const [auth, dispatchAuth] = useReducer(authReducer, initialAuth);

  return (
    <AuthContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        auth,
        dispatchAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
