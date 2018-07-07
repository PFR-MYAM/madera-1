import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComposantsListPage } from './composants-list';

@NgModule({
  declarations: [
    ComposantsListPage,
  ],
  imports: [
    IonicPageModule.forChild(ComposantsListPage),
  ],
})
export class ComposantsListPageModule {}
