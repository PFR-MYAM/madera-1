import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http';

import { MyApp } from './app.component';

import { LoginPage } from '../pages/login/login';
import { DevisListPage } from "../pages/devis-list/devis-list";
import { DevisFormPage } from "../pages/devis-form/devis-form";
import { DevisDetailPage } from "../pages/devis-detail/devis-detail";
import { ComposantsListPage } from "../pages/composants-list/composants-list";
import { ComposantFormPage } from "../pages/composant-form/composant-form";
import { ComposantDetailPage } from "../pages/composant-detail/composant-detail";
import { DevisListComptablePage } from "../pages/devis-list-comptable/devis-list-comptable";
import { DevisDetailComptablePage} from "../pages/devis-detail-comptable/devis-detail-comptable";

import { LogoutButton } from '../components/logout-button/logout-button';

import { UserProvider } from '../providers/user/user';
import { DevisProvider } from '../providers/devis/devis';
import { ComposantProvider } from '../providers/composant/composant';
import { FournisseurProvider } from '../providers/fournisseur/fournisseur';
import { GammeProvider } from '../providers/gamme/gamme';
import { ApiProvider } from '../providers/api/api';
import { ClientProvider } from '../providers/client/client';
import { ClientFormPage } from '../pages/client-form/client-form';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    DevisListPage,
    DevisFormPage,
    DevisDetailPage,
    ComposantsListPage,
    ComposantFormPage,
    ComposantDetailPage,
    DevisListComptablePage,
    DevisDetailComptablePage,
    ClientFormPage,

    LogoutButton

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    DevisListPage,
    DevisFormPage,
    DevisDetailPage,
    ComposantsListPage,
    ComposantFormPage,
    ComposantDetailPage,
    DevisListComptablePage,
    DevisDetailComptablePage,
    ClientFormPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserProvider,
    DevisProvider,
    ComposantProvider,
    FournisseurProvider,
    GammeProvider,
    ApiProvider,
    ClientProvider
  ]
})
export class AppModule {}
