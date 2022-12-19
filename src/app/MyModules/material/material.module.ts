import { NgModule } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';

const MatModules=[
  MatButtonModule,
  MatDialogModule,
  MatIconModule
]

@NgModule({
  imports: [MatModules],
  exports : [MatModules]
})
export class MaterialModule { }
