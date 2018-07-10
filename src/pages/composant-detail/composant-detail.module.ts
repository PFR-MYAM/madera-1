import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComposantDetailPage } from './composant-detail';

@NgModule({
  declarations: [
    ComposantDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(ComposantDetailPage),
  ],
})
export class ComposantDetailPageModule {}
