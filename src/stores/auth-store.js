import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { auth, db } from '@/firebase'
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut, onAuthStateChanged,
  EmailAuthProvider, updatePassword,
  reauthenticateWithCredential,
  deleteUser
} from 'firebase/auth'
import { doc, setDoc, getDoc, updateDoc, deleteDoc, Timestamp } from 'firebase/firestore'
import uploadAvatar from '@/api/upload-avatar'

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref(null)
  const isLoading = ref(true)

  // Getters
  const isLoggedIn = computed(() => (user.value ? true : false))
  const userType = computed(() => {
    return user.value?.type
  })
  const avatarURL = computed(() => {
    return user.value?.avatar
  })
  const fullName = computed(() => {
    return user.value?.fullName
  })

  // Actions
  async function register(email, password, fullname) {
    const credential = await createUserWithEmailAndPassword(auth, email, password)

    await setDoc(doc(db, 'users', credential.user.uid), {
      email: email,
      type: 'customer',
      fullName: fullname,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=nexus',
      favorites: [],
      blackListed: false,
      registerDate: Timestamp.now()
    })

    user.value = credential.user
  }

  async function login(email, password) {
    const credential = await signInWithEmailAndPassword(auth, email, password)

    const docSnap = await getDoc(doc(db, 'users', credential.user.uid))
    const userData = docSnap.data()
    user.value = {
      ...credential.user,
      fullName: userData.fullName,
      type: userData.type,
      avatar: userData.avatar,
      blackListed: userData.blackListed,
      registerDate: userData.registerDate?.toDate()
    }
  }

  async function logout() {
    await signOut(auth)
    user.value = null
  }

  async function updateAvatar(file) {
    const newAvatarURL = await uploadAvatar(file);
    if (!avatarURL) {
      return null;
    }

    const docRef = doc(db, 'users', user.value.uid);
    await updateDoc(docRef, {
      avatar: newAvatarURL,
    });

    user.value.avatar = newAvatarURL;

    return newAvatarURL;

  }

  async function updateFullName(name) {
    if (
      !name ||
      typeof name != "string" || 
      name == "" ||
      name.length > 50
    ) {
      return false
    }

    const docRef = doc(db, 'users', user.value.uid);
    await updateDoc(docRef, {
      fullName: name,
    });

    user.value.fullName = name;

    return true;
  }


  let authReadyResolve;
  const authReady = new Promise(resolve => {
    authReadyResolve = resolve;
  })

  function initAuth() {
    onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const docSnap = await getDoc(doc(db, 'users', firebaseUser.uid))
        const userData = docSnap.data()

        user.value = {
          ...firebaseUser,
          ...userData,
        }
      } else {
        user.value = null;
      }

      isLoading.value = false;
      authReadyResolve();
    })
  }

  async function changePassword(currentPassword, newPassword) {
    const curUser = auth.currentUser;
    
    // Reauthentificate again
    const credential = EmailAuthProvider.credential(curUser.email, currentPassword);
    await reauthenticateWithCredential(curUser, credential);

    await updatePassword(curUser, newPassword)
  }

  async function deleteAccount(currentPassword) {
    const curUser = auth.currentUser;

    // Reauthentificate again
    const credential = EmailAuthProvider.credential(curUser.email, currentPassword);
    await reauthenticateWithCredential(curUser, credential);

    // Deleting user data from Firestore
    await deleteDoc(doc(db, "users", curUser.uid));

    // Deleting data from Firebase Authentifciation
    await deleteUser(curUser)
  }



  return {
    user, isLoading, avatarURL, fullName, 
    login, logout, initAuth, register,
    isLoggedIn, userType, 
    updateAvatar, updateFullName,
    changePassword, deleteAccount,
    authReady
  }
})
