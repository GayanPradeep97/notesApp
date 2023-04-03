import { Component, OnInit } from '@angular/core';
import { NoteService } from '../note.service';
import { Note } from '../note'
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})

export class NoteComponent implements OnInit {

  noteForm !: FormGroup;

  notesData: any=[];

  noteObj : Note = {
    id:'',
    note_title:'',
    note_des:'',
  }

  constructor( private formBuilder: FormBuilder,  private noteServics:NoteService ){

      this.noteForm = this.formBuilder.group({
        title : ['',Validators.required],
        description:['', Validators.required]
      })
    }

  ngOnInit(){
    this.getAllNotes();
  }

  addNote(){
    const {value} = this.noteForm;
    this.noteObj.id= '';
    this.noteObj.note_title = value.title;
    this.noteObj.note_des = value.description;

    this.noteServics.addNote(this.noteObj).then((note) => {

      if(note){
        alert('Firestore adata added success');
        this.noteForm.reset();  
        this.getAllNotes();    
      }
     
    })
  }

  getAllNotes(){
    this.noteServics.getNotes().subscribe((res:Note[]) =>{
      console.log(res);
      this.notesData = res;
    })
  }

  
}
