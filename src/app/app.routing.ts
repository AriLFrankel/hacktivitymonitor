import { Routes, RouterModule, CanActivate } from '@angular/router'

import { RoomScheduleComponent } from './components/room-schedule.component'
import { AppComponent } from './components/app.component'

const APP_ROUTES: Routes = [
    { path: '', component: AppComponent },
    { path: ':roomName', component: RoomScheduleComponent }
]

export const routing = RouterModule.forRoot(APP_ROUTES)
