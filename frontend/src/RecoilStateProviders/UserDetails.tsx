import { atom } from 'recoil';

export const usernameState = atom({
  key: 'usernameState', // unique ID (with respect to other atoms/selectors)
  default: localStorage.getItem('username') || '', // default value (aka initial value)
});

export const emailState = atom({
  key: 'emailState',
  default: localStorage.getItem('email') || '',
});
