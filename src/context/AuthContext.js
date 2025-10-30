import React, { createContext, useState, useEffect, useContext } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  signInWithPopup,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { auth, googleProvider } from '../firebase';

// Create the AuthContext
const AuthContext = createContext();

// Custom hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// AuthProvider component that wraps the app
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Signup with email and password
  const signup = async (email, password) => {
    try {
      return await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error('Signup error:', error.message);
      throw error;
    }
  };

  // Login with email and password
  const login = async (email, password) => {
    try {
      return await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error('Login error:', error.message);
      throw error;
    }
  };

  // Logout the current user
  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Logout error:', error.message);
    }
  };

  // Sign in with Google popup
  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      if (error.code === 'auth/popup-blocked') {
        alert('Please enable popups for Google Sign-In.');
      } else {
        console.error('Google sign-in error:', error.message);
      }
      throw error;
    }
  };

  // Reset password
  const resetPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      alert('Password reset email sent.');
    } catch (error) {
      console.error('Password reset error:', error.message);
      throw error;
    }
  };

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  // Context value to be shared
  const value = {
    currentUser,
    signup,
    login,
    logout,
    signInWithGoogle,
    resetPassword,
  };

  // Only render children when Firebase finishes checking auth state
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};