import { Routes, RouterModule } from "@angular/router";
import { RoomsComponent } from './rooms.component';
import { AuthPageComponent } from './auth-page.component';
import { ROOM_ROUTES } from './room.routing';

const APP_ROUTES: Routes = [
    { path: '', redirectTo: '/auth', pathMatch: 'full' },
    { path: 'rooms', component: RoomsComponent, children: ROOM_ROUTES },
    { path: 'auth', component: AuthPageComponent }
];

export const routing = RouterModule.forRoot(APP_ROUTES);