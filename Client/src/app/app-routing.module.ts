import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CommunityComponent } from './components/community/community.component';
import { HomeComponent } from './components/home/home.component';
import { ProjectPageComponent } from './components/project-page/project-page.component';
import { TrainingCourseComponent } from './components/training-course/training-course.component';
import { TrainingHomeComponent } from './components/training-home/training-home.component';
import { RewardComponent } from './components/reward/reward.component';
import { LoginComponent } from './components/login/login.component';
import { ChatComponent } from './components/chat/chat.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import {
  canActivate,
  redirectUnauthorizedTo,
  redirectLoggedInTo,
} from '@angular/fire/auth-guard';
import { TaskPageComponent } from './components/task-page/task-page.component';
import { RecreationalComponent } from './components/recreational/recreational.component';

const redirectToLogin = () => redirectUnauthorizedTo(['login']);
const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'profile', component: ProfileComponent, ...canActivate(redirectToLogin),},
  { path: 'sign-up/:type', component: SignUpComponent},
  { path: 'login/:type', component: LoginComponent},
  { path: 'dashboard', component: DashboardComponent },
  { path: 'community', component: CommunityComponent },
  { path: 'home', component: HomeComponent },
  { path: 'projects/:project_id', component: ProjectPageComponent },
  { path: 'training', component: TrainingHomeComponent },
  { path: 'rewards', component: RewardComponent },
  { path: 'chat', component: ChatComponent },
  { path: 'training/:course_id', component: TrainingCourseComponent },
  { path: 'projects/:project_id/:featur_title/:task_title', component: TaskPageComponent }, //TASK PAGE
  { path: 'recreational', component: RecreationalComponent },
  

  // { path: 'signin', component: SignInComponent },
  // { path: 'signup', component: SignUpComponent },
  // {
  //   path: 'dashboard', component: DashboardComponent,
  //   loadChildren: () => import('./home/dashboard/dashboard.module').then(m => m.DashboardModule)
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true,
    onSameUrlNavigation: 'reload',
    paramsInheritanceStrategy: 'always',
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
