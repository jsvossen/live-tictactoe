import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { User } from './user';

@Injectable()
export class UserService {

	private usersUrl = 'api/users';

	constructor(private http: Http) { }

	getUsers(): Promise<User[]> {
		return this.http.get(this.usersUrl)
						.toPromise()
						.then(response => response.json() as User[])
						.catch(this.handleError);
	}

	private headers = new Headers({'Content-Type': 'application/json'});

	add(name: string): Promise<User> {
		return this.http
			.post(this.usersUrl, JSON.stringify({name: name}), { headers: this.headers })
			.toPromise()
			.then(res => res.json())
			.catch(this.handleError);
	}

	delete(id: string): Promise<void> {
		const url = `${this.usersUrl}/${id}`;
	  	return this.http.delete(url, {headers: this.headers})
	    	.toPromise()
	    	.then(() => null)
	    	.catch(this.handleError);
	}

	private handleError(error: any): Promise<any> {
	 	console.error('An error occurred', error); // for demo purposes only
	  	return Promise.reject(error.message || error);
	}

}