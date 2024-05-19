import { FirebaseError } from 'firebase/app';
import {
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { auth } from './config';
import { IUser } from '../utils/interfaces';


export const firebaseAuthSignIn = async (emailProp: string, password: string): Promise<string | IUser> => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, emailProp, password);

    if (user) {
      const token = await user.getIdToken();
      const { email, uid } = user;
      
      return { email: email!, uid, token };
    }
  } catch (error: unknown) {
    const firebaseError = error as FirebaseError;
    console.error('Error signing in:', firebaseError);
    return firebaseError.code;
  }

  return 'unknown-error';
};

export const firebaseAuthSignOut = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error(error);
  }
};