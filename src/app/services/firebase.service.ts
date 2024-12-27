import { inject, Injectable } from '@angular/core';
import { Auth, signInWithPopup, GoogleAuthProvider } from '@angular/fire/auth';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private provider = new GoogleAuthProvider();
  private auth = inject(Auth);


  signIn(): Promise<string | null> {
    this.provider.setCustomParameters({ prompt: 'select_account' });
    return signInWithPopup(this.auth, this.provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        const user = result.user;
        return user.displayName || null
      })
      .catch((error) => {
        console.error('Error during sign-in:', error)
        throw error
      });

  }

  checkUserLogin(): Observable<string|null> {
    return new Observable((observer) => {
      onAuthStateChanged(this.auth, user => {
        if (user) {
        observer.next(user.displayName)
        observer.complete()
        } else {
          observer.next(null)
        observer.complete()
      }
      })
    })

  }

  signOut(): Observable<null> {
    return new Observable((observer) => {
      const auth = getAuth()
      signOut(auth).then(() => {
        observer.next(null)
        observer.complete()
      }).catch((error) => {
        console.log('signedOut error')
        observer.error()
      })
    })

  }

}
