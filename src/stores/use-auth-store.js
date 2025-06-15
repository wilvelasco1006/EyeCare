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
        // Log para depurar DENTRO del store:
        console.log("useAuthStore: signInWithPopup result:", result);
        if (result && result.user) {
          console.log("useAuthStore: result.user existe:", result.user);
          set({ userLooged: result.user });
          return result.user; // <--- ¿Está esta línea presente y correcta?
        } else {
          console.error("useAuthStore: result.user NO existe o result es nulo. Result:", result);
          set({ userLooged: null }); // Asegúrate de limpiar si no hay usuario
          return undefined; // O null, para ser explícito
        }
      } catch (error) {
        console.error("useAuthStore: Error en signInWithPopup:", error);
        set({ userLooged: null });
        throw error; // Relanzar para que el .catch() en Sign.jsx funcione
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
