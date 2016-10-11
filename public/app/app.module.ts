import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { RouterModule }  from '@angular/router';

import { AppComponent }  			  from './app.component';
import { UserRegistrationComponent }  from './user-registration.component';
import { ChatComponent }  			from './chat.component';

@NgModule({
  imports:      [ 
  	BrowserModule,
  	FormsModule,
  	RouterModule.forRoot([
      {
        path: '',
        redirectTo: '/chat',
        pathMatch: 'full'
      },
	  	{
	  		path: 'registration',
	  		component: UserRegistrationComponent
	  	},
	  	{
	  		path: 'chat',
	  		component: ChatComponent
	  	}
  	])
  ],
  declarations: [ 
  	AppComponent,
  	UserRegistrationComponent,
  	ChatComponent 
  ],
  bootstrap:	[ AppComponent ]
})
export class AppModule { }
