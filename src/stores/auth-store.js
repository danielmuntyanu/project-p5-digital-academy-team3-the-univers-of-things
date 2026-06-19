import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import { auth, db } from "@/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";


export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref(null);
  const isLoading = ref(true);

  // Getters
  const isLoggedIn = computed(() => user.value ? true : false);
  const userType = computed(() => {
    return user.value?.type;
  });

  // Actions
  async function register(email, password, fullname) {
    const credential = await createUserWithEmailAndPassword(auth, email, password);

    await setDoc(
      doc(db, "users", credential.user.uid), {
        email: email,
        type: "customer",
        fullName: fullname,
        avatar: "",
        favorites: [],
        blackListed: false
      }
    );

    user.value = credential.user;
  }

  async function login(email, password) {
    const credential = await signInWithEmailAndPassword(auth, email, password);
    
    const docSnap = await getDoc(doc(db, "users", credential.user.uid))
    const userData = docSnap.data();
    user.value = {
      ...credential.user,
      fullName: userData.fullName,
      type: userData.type,
      avatar: userData.avatar,
      blackListed: userData.blackListed,
    }
  }

  async function logout() {
    await signOut(auth);
    user.value = null;
  }

  function initAuth() {
    onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const docSnap = await getDoc(doc(db, "users", firebaseUser.uid))
        const userData = docSnap.data();

        user.value = {
          ...firebaseUser,
          ...userData
        };
      }

      isLoading.value = false;
    });
  }

  return { user, isLoading, register, login, logout, initAuth, isLoggedIn, userType};

})
