import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { ProjectPageComponent } from './components/project-page/project-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { FeatureCostPopupComponent } from './components/popups/feature-cost-popup/feature-cost-popup.component';
import { TrainingHomeComponent } from './components/training-home/training-home.component';
import { TrainingCourseComponent } from './components/training-course/training-course.component';

import { NgxCollapseModule } from 'ngx-collapse';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastComponent } from './components/toast/toast.component';
import { CommunityComponent } from './components/community/community.component';
import { RewardComponent } from './components/reward/reward.component';
import { DatePipe } from '@angular/common';
import { SafePipe } from './safe.pipe';
import { LoginComponent } from './components/login/login.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { HotToastModule } from '@ngneat/hot-toast';
import { ChatComponent } from './components/chat/chat.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete'

// --------------------------------------------------------------------------------

import { getStorage, provideStorage } from '@angular/fire/storage';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { MatMenuModule } from '@angular/material/menu';

import { MatListModule, MatSelectionList } from '@angular/material/list';
import {} from '@angular/material/form-field';
import {} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';

import { DateDisplayPipe } from './pipes/date-display.pipe';
import { TimeAgoPipe } from 'time-ago-pipe';
import { MatDividerModule } from '@angular/material/divider';
import { ProfileComponent } from './components/profile/profile.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';

import { HttpClientModule } from '@angular/common/http';
import { ApiUrls } from './api_urls';
import { BuyRewardPopupComponent } from './components/popups/buy-reward-popup/buy-reward-popup.component';
import { CreateProjectPopupComponent } from './components/popups/create-project-popup/create-project-popup.component';
import { AddFeaturePopupComponent } from './components/popups/add-feature-popup/add-feature-popup.component';
import { AddShowcasePostPopupComponent } from './components/popups/add-showcase-post-popup/add-showcase-post-popup.component';
import { AddTaskPopupComponent } from './components/popups/add-task-popup/add-task-popup.component';
import { TaskPageComponent } from './components/task-page/task-page.component';
import { CreateRewardsPopupComponent } from './components/popups/create-rewards-popup/create-rewards-popup.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { AddCommunityPostPopupComponent } from './components/popups/add-community-post-popup/add-community-post-popup.component';
import { RecreationalComponent } from './components/recreational/recreational.component';
import { AddFactPopupComponent } from './components/popups/add-fact-popup/add-fact-popup.component';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    DashboardComponent,
    HomeComponent,
    ProjectPageComponent,
    FeatureCostPopupComponent,
    TrainingHomeComponent,
    TrainingCourseComponent,
    ToastComponent,
    CommunityComponent,
    RewardComponent,
    SafePipe,
    LoginComponent,
    DateDisplayPipe,
    ChatComponent,
    ProfileComponent,
    SignUpComponent,
    SafePipe,
    BuyRewardPopupComponent,
    CreateProjectPopupComponent,
    AddFeaturePopupComponent,
    AddShowcasePostPopupComponent,
    AddTaskPopupComponent,
    TaskPageComponent,
    CreateRewardsPopupComponent,
    AddCommunityPostPopupComponent,
    RecreationalComponent,
    AddFactPopupComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule, 
    
    MatInputModule, 
    MatButtonModule, 
    MatCardModule, 
    MatFormFieldModule,
    MatSelectModule,
    NgxCollapseModule,
    FormsModule,
    MatToolbarModule,
    MatIconModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideStorage(() => getStorage()),
    provideFirestore(() => getFirestore()),
    HotToastModule.forRoot(),
    MatAutocompleteModule,
    MatMenuModule,
    MatListModule,
    MatInputModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatDividerModule,
    HttpClientModule,
    MatSnackBarModule
  ],
  providers: [
    DatePipe,
    ApiUrls

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
