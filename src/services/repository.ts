import { collection, getDocs, getDoc, addDoc, doc, setDoc, updateDoc, deleteDoc } from 'firebase/firestore'
import { db } from '../Firebase'
import { IMyEvent } from '../types'

export class Repository {

  static async getMyEvents(): Promise<IMyEvent[]> {
    const myEventsSnapshot = await getDocs(collection(db, 'my-events'))
    const myEventList = myEventsSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }) as any)
    return myEventList
  }

  static async getMyEvent(id: string): Promise<IMyEvent> {
    const docRef = doc(db, 'my-events', id)
    const docSnap = await getDoc(docRef)
    return ({ ...docSnap.data(), id: docSnap.id }) as any
  }

  static async createMyEvent(myEvent: Omit<IMyEvent, 'id'>): Promise<void> {
    addDoc(collection(db, 'my-events'), myEvent)
  }

  static async updateMyEvent(id: string, data: Partial<IMyEvent>): Promise<void> {
    const docRef = doc(db, 'my-events', id)
    setDoc(docRef, data, { merge: true })
  }

  static async deleteMyEvent(id: string): Promise<void> {
    const docRef = doc(db, 'my-events', id)
    deleteDoc(docRef)
  }
}
