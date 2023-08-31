export function authenticatedUser() {
    const user = JSON.parse(localStorage.getItem('user'));
    return user !== null;
}
