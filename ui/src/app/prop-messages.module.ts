import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { PropMessagesComponent } from './prop-messages.component';

@NgModule({
  declarations: [
    PropMessagesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [PropMessagesComponent]
})
export class PropMessagesModule { }
