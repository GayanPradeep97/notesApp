import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoteComponent } from './note/note.component';
import { provideFirebaseApp, initializeApp} from '@angular/fire/app';
import { getFirestore, provideFirestore} from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
// import { AngularFireModule } from '@angular/fire';
import { ReactiveFormsModule} from '@angular/forms';
import { MatDialogModule} from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';


@NgModule({
  declarations: [
    AppComponent,
    NoteComponent,
  
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()),
    ReactiveFormsModule,
    MatDialogModule

  ],
  providers: [
    {provide: MatDialogRef, useValue: {}}
     ],
  bootstrap: [AppComponent]
})
export class AppModule { }
