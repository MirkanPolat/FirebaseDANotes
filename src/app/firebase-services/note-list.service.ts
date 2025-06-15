import { Injectable, inject } from '@angular/core';
import { Note } from '../interfaces/note.interface';
import { collectionData, Firestore, collection, doc, onSnapshot } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class NoteListService {
  trashNotes: Note[] = [];
  normalNotes: Note[] = [];
  
  notes$;
  firestore: Firestore = inject(Firestore);

  unsubList; 
  unsubSingle;

  constructor() {
    this.unsubList = onSnapshot(this.getNotesRef(), (list) => {
      list.forEach(element => {
        console.log(element);
      });
    });

    this.unsubSingle = onSnapshot(this.getSingleDocRef("notes", "a665s4d6a1s9d"), (element) => {
    });

    this.unsubSingle();
    this.unsubList();

    this.notes$ = collectionData(this.getNotesRef());
    this.notes$ = this.notes$.subscribe( (list) => {
      list.forEach(element => {
        console.log(element);
      });
    });
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