import { Routes, RouterModule } from '@angular/router';
import { HackerspaceComponent } from './hackerspace-component.component';
import { RoomScheduleComponent } from './room-schedule.component';

const APP_ROUTES: Routes = [
    { path: '', component: HackerspaceComponent },
    { path: ':roomName', component: RoomScheduleComponent }
];

export const routing = RouterModule.forRoot(APP_ROUTES);
