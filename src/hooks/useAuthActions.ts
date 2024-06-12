// src/hooks/useAuthActions.ts
import { signInWithEmailAndPassword, signOut as firebaseSignOut } from 'firebase/auth';
import { auth } from '@my-firebase/config';
import { setUser, removeUser } from '@redux/slices/userSlice';
import { useAppDispatch } from '@hooks/reduxHooks';
import { IUser } from '@utils/interfaces';
import { FirebaseError } from 'firebase/app';

export const useAuthActions = () => {
  const dispatch = useAppDispatch();

  const signIn = async (email: string, password: string): Promise<string | IUser> => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      if (user) {
        const token = await user.getIdToken();
        const { email, uid } = user;
        const userData = { email: email!, uid, token };
        dispatch(setUser(userData));
        return userData;
      }
    } catch (error: unknown) {
      const firebaseError = error as FirebaseError;
      console.error('Error signing in:', firebaseError);
      return firebaseError.code;
    }
    return 'unknown-error';
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      dispatch(removeUser());
    } catch (error) {
      console.error(error);
    }
  };

  return { signIn, signOut };
};
