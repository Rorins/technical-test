//Auth.js stores the authentication functions related to how the authentication status of the user
//I can center all of the logic related to authentication here
//I use ref so I can handle the values of is Authenticated reactivly
import { ref } from 'vue';
const isAuthenticatedRef = ref(false);

//isAuthenticated keeps track of the user status
export function isAuthenticated() {
  const token = JSON.parse(localStorage.getItem('token'));
  isAuthenticatedRef.value = token !== null;
  return isAuthenticatedRef.value;
}

//log out function will trigger refresh 
export function logout() {
  localStorage.removeItem('token');
  isAuthenticatedRef.value = false;
  window.location.reload();
}
