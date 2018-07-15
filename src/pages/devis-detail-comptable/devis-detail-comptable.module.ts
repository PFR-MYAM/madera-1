import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DevisDetailComptablePage } from './devis-detail-comptable';

@NgModule({
  declarations: [
    DevisDetailComptablePage,
  ],
  imports: [
    IonicPageModule.forChild(DevisDetailComptablePage),
  ],
})
export class DevisDetailComptablePageModule {}
