import { useReducer, createContext } from 'react';

export const AuthContext = createContext({});

function AuthContextProvider({ children }) {
  const authReducer = (state, action) => {
    switch (action.type) {
      case 'CHANGE_USER':
        return { ...state, username: action.value.username };
      case 'CHANGE_EMAIL':
        return { ...state, email: action.value.email };
      case 'LOGIN':
        return {
          status: true,
          username: action.value.username,
          email: action.value.email,
        };
      case 'LOGOUT':
      default:
        return {
          status: false,
          username: '',
          email: '',
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
