import { ref, computed } from 'vue';

const isAuthenticatedRef = ref(false);

export const isAuthenticated = computed(() => {
  const user = JSON.parse(localStorage.getItem('user'));
  isAuthenticatedRef.value = user !== null;
  return isAuthenticatedRef.value;
});
