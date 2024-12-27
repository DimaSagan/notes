import { inject, Injectable } from '@angular/core';
import { initializeApp } from "firebase/app";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, Timestamp, updateDoc } from "firebase/firestore";
import { environment } from '../../environments/environment';
import { CheckList, GetTasks } from '../models/checkList.model';
import { Auth } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  private app = initializeApp(environment)
  private db = getFirestore(this.app)
  private auth = inject(Auth);
  constructor() { }

  async addTask(value: CheckList) {
    const user = this.auth.currentUser
    if (user) {
      const ref = collection(this.db, `users/${user.uid}/checklists`)
      await addDoc(ref,
        {
          ...value
        })
    } else {
      console.log('not login')
    }
  }

  getTasks(): Observable<GetTasks[]> {
    const userId = this.auth.currentUser?.uid
    return new Observable((observer => {
      if (!userId) {
        observer.error('User Not Ligged In')
        return
      }

      const collectionRef = collection(this.db, `users/${userId}/checklists`)

      getDocs(collectionRef)
      .then((snapshot) => {
        const tasks: GetTasks[] = snapshot.docs.map((doc) => {
          const data = doc.data() as CheckList;
          return {
            id: doc.id,
            date: (data.date as Timestamp).toDate(),
            title: data.title,
            tasks: data.tasks, // Конвертация listBlock в tasks
          };
        });
          observer.next(tasks)
          observer.complete()
      }).catch((error) => {
        observer.error(error); 
      });
    }
    ))

  }

  deleteTask(taskId: string) {
    deleteDoc(doc(this.db, `users/${this.auth.currentUser?.uid}/checklists/${taskId}`))
  }

  updateTask(taskId: string, value:CheckList) {
    const taskRef = doc(this.db, `users/${this.auth.currentUser?.uid}/checklists/${taskId}`)
    updateDoc(taskRef, {
      ...value,
      // title: value.title,
    })
  }
}
