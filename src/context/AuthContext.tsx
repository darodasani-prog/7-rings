import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { 
  User as FirebaseUser, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

interface AuthContextType {
  user: FirebaseUser | null;
  dbUser: any | null;
  loading: boolean;
  authError: { code?: string; message: string; domain?: string } | null;
  setAuthError: (error: { code?: string; message: string; domain?: string } | null) => void;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [dbUser, setDbUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthErrorState] = useState<{ code?: string; message: string; domain?: string } | null>(null);

  const setAuthError = (err: { code?: string; message: string; domain?: string } | null) => {
    setAuthErrorState(err);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // Fetch or create user document in Firestore to persist their profile
        const userRef = doc(db, 'users', currentUser.uid);
        try {
          const userDoc = await getDoc(userRef);
          if (userDoc.exists()) {
            setDbUser(userDoc.data());
          } else {
            // Register a new user in Firestore
            const newUser = {
              uid: currentUser.uid,
              name: currentUser.displayName || '7 Rings Fan',
              email: currentUser.email || '',
              role: 'user',
              createdAt: new Date().toISOString(),
            };
            await setDoc(userRef, newUser);
            setDbUser(newUser);
          }
        } catch (error) {
          console.error("Error synchronizing authenticated user profile with Firestore: ", error);
        }
      } else {
        setDbUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async () => {
    setAuthErrorState(null);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error: any) {
      console.error("Google login failed: ", error);
      const code = error?.code || '';
      const message = error?.message || 'Unknown authentication failure';
      
      let friendlyMessage = message;
      if (code === 'auth/unauthorized-domain' || message.includes('unauthorized-domain')) {
        friendlyMessage = `This domain (${window.location.hostname}) is not authorized in your Firebase project. You must add it to the 'Authorized Domains' list under Authentication settings in your Firebase Console.`;
      } else if (code === 'auth/popup-blocked' || message.includes('popup-blocked')) {
        friendlyMessage = 'The Sign-In popup was blocked by your browser. Please allow popups for this site and try again.';
      } else if (code === 'auth/popup-closed-by-user') {
        friendlyMessage = 'The Google Sign-In popup was closed before authentication could complete. Please try signing in again.';
      }

      setAuthErrorState({
        code,
        message: friendlyMessage,
        domain: window.location.hostname
      });
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Sign out failed: ", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, dbUser, loading, authError, setAuthError, loginWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
