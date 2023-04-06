import { Component, Input, OnInit } from '@angular/core';
import { NoteService } from '../note.service';
import { Note } from '../note'
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';





@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})

export class NoteComponent implements OnInit {

  

  noteForm !: FormGroup;
  editForm !: FormGroup;

  notesData: any=[];

  notesDetails : any=[];

  noteObj : Note = {
    id:'',
    note_title:'',
    note_des:'',
  }

  constructor( private formBuilder: FormBuilder,  private noteServics:NoteService, private dialogRef: MatDialogRef<NoteComponent>){

      this.noteForm = this.formBuilder.group({
        title : ['',Validators.required],
        description:['', Validators.required]
      });

      this.editForm = this.formBuilder.group({
        edit_title : ['',Validators.required],
        edit_description:['', Validators.required]
      })
    }

  ngOnInit(){

    this.getAllNotes();
  }

  //Add data to firebase
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
  



  //get data into display
  getAllNotes(){
    this.noteServics.getNotes().subscribe((res:Note[]) =>{
      console.log(res);
      this.notesData = res;
    })
  }

  //delete data
  deleteNote(note: Note){
    let decision = confirm('Are sure want to delete this Note ?');
    if(decision == true){
      this.noteServics.deleteNote(note);
    }
  }

  //edit button onclick function
  getAllDtails(note:Note){
    this.notesDetails = note;
    console.log(this.notesDetails)
    
  }

  //Updatee data
  updateNote(note:Note){
    console.log('Note:', note);
  
    const {value} = this.editForm
    console.log('Edit Form Value:', value);
  
    this.noteObj.id = note.id;
    this.noteObj.note_title = value.edit_title;
    this.noteObj.note_des = value.edit_description;
  
    console.log('Note Object:', this.noteObj);
  
    this.noteServics.updateNote(note, this.noteObj).then(()=>{
      alert('note updated successfull!')
    })
  
    this.editForm.reset();
  }
  
  
  


  

 
}
