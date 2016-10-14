import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }   from '@angular/http';
import { RouterModule }  from '@angular/router';

import { AppComponent }  			  from './app.component';
import { ChatComponent }  			from './chat.component';
import { TicTacToeComponent }   from './tictactoe.component';
import { UserListComponent}     from './user-list.component';
import { UserRegistrationComponent }  from './user-registration.component';
import { UserService }                from './user.service';

@NgModule({
  imports:      [ 
  	BrowserModule,
  	FormsModule,
    HttpModule,
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
  	ChatComponent,
    TicTacToeComponent,
    UserRegistrationComponent,
    UserListComponent
  ],
  providers: [
    UserService
  ],
  bootstrap:	[ AppComponent ]
})
export class AppModule { }
