import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComposantFormPage } from './composant-form';

@NgModule({
  declarations: [
    ComposantFormPage,
  ],
  imports: [
    IonicPageModule.forChild(ComposantFormPage),
  ],
})
export class ComposantFormPageModule {}
