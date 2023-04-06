import { Injectable } from '@angular/core';
import { Note } from './note';
import { Firestore, collectionData, deleteDoc, doc, updateDoc} from '@angular/fire/firestore'
import { addDoc, collection } from 'firebase/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor( private fs:Firestore) { }


  //Add new Note code here

  addNote(note: Note){
    note.id = doc(collection(this.fs, 'id')).id
    return addDoc(collection(this.fs, 'Notes'),note)
  }

  //get All notes from Database
  getNotes():Observable<Note[]>{
    let notesRef = collection(this.fs, 'Notes')
    return collectionData(notesRef,{ idField:'id'}) as Observable<Note[]>
  }

  //Delete note from database

  deleteNote(note: Note){
    let docRef =doc(this.fs, `Notes/${note.id}`);

    return deleteDoc(docRef)
  }

  //update notes
  updateNote(note: Note, notes: any) {
    console.log('Note:', note);
    let docRef = doc(this.fs, `Notes/${note.id}`);
    return updateDoc(docRef, notes);
  }
  
}
