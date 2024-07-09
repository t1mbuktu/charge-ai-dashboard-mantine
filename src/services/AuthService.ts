import { UserCredential, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { User } from "../models/User";
import { auth, googleProvider } from "../config/firebase";


export class AuthService {
    
    public static async handleSignUp(email: string, password: string): Promise<User> {

        const userCred = await createUserWithEmailAndPassword(auth, email, password);

        const user = this.userCredToUser(userCred)
        window.localStorage.setItem("loggedInUser", JSON.stringify(user))

        return user;
    }

    public static async handleSignIn(email: string, password: string): Promise<User> {

        const userCred = await signInWithEmailAndPassword(auth, email, password);

        const user = this.userCredToUser(userCred)
        window.localStorage.setItem("loggedInUser", JSON.stringify(user))

        console.log('reloaded')
        location.reload();
        return user;
    }

    public static async handleGoogleSignIn(): Promise<User> {

        const userCred = await signInWithPopup(auth, googleProvider);

        const user = this.userCredToUser(userCred)
        window.localStorage.setItem("loggedInUser", JSON.stringify(user))
        
        return user;
    }

    public static async handleSignOut(): Promise<void> {
        await signOut(auth);
        window.localStorage.removeItem("loggedInUser")
    }

    public static getLoggedInUser(): User | undefined {
        const user = window.localStorage.getItem("loggedInUser")
        if(user) {
            return JSON.parse(user);
        } else {
            return undefined;
        }
    }

    private static userCredToUser(userCred: UserCredential): User {
        const user = userCred.user
        return {
            id: user.uid,
            email: user.email!,
            name: user.displayName ? user.displayName : undefined,
            photoUrl: user.photoURL ? user.photoURL : undefined
        }
    }


}