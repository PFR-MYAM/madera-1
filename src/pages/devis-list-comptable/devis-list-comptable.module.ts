import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DevisListComptablePage } from './devis-list-comptable';

@NgModule({
  declarations: [
    DevisListComptablePage,
  ],
  imports: [
    IonicPageModule.forChild(DevisListComptablePage),
  ],
})
export class DevisListComptablePageModule {}
