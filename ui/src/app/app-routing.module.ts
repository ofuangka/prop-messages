import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConversationListComponent } from './conversation-list/conversation-list.component';
import { MessagesComponent } from './messages/messages.component';
import { PhoneCallComponent } from './phone-call/phone-call.component';

const routes: Routes = [
    { path: '', redirectTo: '/conversations', pathMatch: 'full' },
    { path: 'conversations', component: ConversationListComponent },
    { path: 'conversations/:conversationId', component: MessagesComponent },
    { path: 'phone-call', component: PhoneCallComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}