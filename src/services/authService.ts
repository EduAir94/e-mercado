import store from '../store';

const AuthService = {
  isLoggedIn() {
    const userState = store.getState().user;
    return userState.isLoggedIn;
  },
  user(): { email: string } {
    return store.getState().user;
  },
  login({ email }: { email: string }) {
    store.dispatch({
      type: 'user/login',
      payload: {
        email,
      },
    });
  },
  logout() {
    store.dispatch({
      type: 'user/logout',
    });
  },
  setLoggedIn() {
    const email = localStorage.getItem('email');
    if (email) {
      store.dispatch({
        type: 'user/login',
        payload: {
          email,
        },
      });
    }
  },
};

export default AuthService;
