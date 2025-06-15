import { Injectable, inject } from '@angular/core';
import { Note } from '../interfaces/note.interface';
import { collectionData, Firestore, collection, doc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteListService {

  trashNotes: Note[] = [];
  normalNotes: Note[] = [];
  
  notes$;
  firestore: Firestore = inject(Firestore);

  constructor() {
    this.notes$ = collectionData(this.getNotesRef());
   }

  getNotesRef(){
    return collection(this.firestore, 'notes');
  }

   getTrashRef(){
    return collection(this.firestore, 'trash');
  }

  getSingleDocRef(colID: string, docID: string){
    return doc(collection(this.firestore, colID), docID);
  }
}