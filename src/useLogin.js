import {computed, readonly, ref} from "vue";
import {pb} from '@/pocketbase.js'
import { useBoards } from '@/useBoards.js'
// Make variable Singleton to not create multiple storages for currentUser
// Move it out of the scope of the composable to make it a singleton automatically based on JS import/export
const currentUser = ref(null);
const {resetBoard} = useBoards();

// Check if the user is still logged in through pb.authStore / token saved in localStorage
// If yes set the saved user to be the current user
if (!currentUser.value && pb.authStore.isValid && pb.authStore.record) {
    currentUser.value = pb.authStore.record;
    console.log('Logged in user loaded from localStorage: ', currentUser.value)
}

export function useLogin() {

    const login = async (email, password) => {
        const data = await pb.collection('users').authWithPassword(
            email,
            password,
        );
        resetBoard();
        localStorage.removeItem('currentBoard');
        console.log('User logged in', currentUser.value);
    }


    const logout = () => {
        currentUser.value = null;
        pb.authStore.clear();
        console.log('User logged out', currentUser.value);
    }

    const register = async (email, name, password, passwordRepeat) => {
      const newUser = {
        email: email,
        name: name,
        password: password,
        passwordConfirm: passwordRepeat,
      }
      await pb.collection('users').create(newUser);
      console.log("New user", newUser);
    }

  const isLoggedIn = computed(() => !!currentUser.value);

    return {
        isLoggedIn,
        currentUser: readonly(currentUser),
        login,
        logout,
        register,
    }
}
