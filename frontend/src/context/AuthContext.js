'use client'
import React, { useContext, useState, useEffect } from 'react';
import {
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    GoogleAuthProvider,
    signInWithPopup,
    updateProfile,  // ✅ Needed for displayName
} from 'firebase/auth';
import { auth, db } from '../../firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUserDocument = async (user, name = null) => {
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);

        if (!userDoc.exists()) {
            await setDoc(userDocRef, {
                email: user.email,
                name: name || user.displayName || user.email.split('@')[0],
                createdAt: new Date(),
                role: 'user'
            });
        }
    };

    async function signup(email, password, name) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);

        // ✅ Update Firebase Auth profile with name
        await updateProfile(userCredential.user, { displayName: name });

        // ✅ Create Firestore document with name
        await createUserDocument(userCredential.user, name);

        return '/';
    }

    async function login(email, password) {
        const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
        await signInWithEmailAndPassword(auth, email, password);
        if (email === adminEmail) {
            return '/admin';
        }
        return '/';
    }

    async function logout() {
        await signOut(auth);
        return '/login';
    }

    async function loginWithGoogle() {
        const provider = new GoogleAuthProvider();
        const userCredential = await signInWithPopup(auth, provider);
        await createUserDocument(userCredential.user);
        return '/';
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
        });
        return unsubscribe;
    }, []);

    const value = {
        currentUser,
        signup,
        login,
        logout,
        loginWithGoogle,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
