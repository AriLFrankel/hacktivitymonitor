import { Routes, RouterModule, CanActivate } from '@angular/router'

import { RoomScheduleComponent } from './components/room-schedule.component'
import { AppComponent } from './components/app.component'
import { JuniorSeniorDisplayComponent } from './components/junior-senior-display.component'

const APP_ROUTES: Routes = [
    { path: '', component: AppComponent },
    { path: 'Junior', component: JuniorSeniorDisplayComponent},
    { path: 'Senior', component: JuniorSeniorDisplayComponent},
    { path: ':roomName', component: RoomScheduleComponent }
]

export const routing = RouterModule.forRoot(APP_ROUTES)
