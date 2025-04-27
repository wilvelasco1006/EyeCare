import { create } from "zustand";
import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../firebase.config";

const useAuthStore = create((set) => {
  const observeAuthState = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        set({ userLooged: user });
      } else {
        set({ userLooged: null });
      }
    });
  };

  observeAuthState();

  return {
    userLooged: null,
    loginGoogleWithPopup: async () => {
      try {
        const result = await signInWithPopup(auth, new GoogleAuthProvider());
        set({ userLooged: result.user });
      } catch (error) {
        console.error(error);
      }
    },
    Logout: async () => {
      try {
        await signOut(auth);
        set({ userLooged: null });
      } catch (error) {
        console.error(error);
      }
    },
  };
});

export default useAuthStore;
