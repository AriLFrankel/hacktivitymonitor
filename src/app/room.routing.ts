import { Routes } from "@angular/router";

import { RoomsComponent } from './rooms.component';
import { RoomScheduleComponent } from './room-schedule.component';

export const ROOM_ROUTES: Routes = [
    { path: '', component: RoomsComponent },
    { path: ':id', component: RoomScheduleComponent },
];