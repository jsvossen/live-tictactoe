//from angular Heroes tutorial

import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Player } from './player';

@Injectable()
export class PlayerService {

	private playersUrl = 'api/players';

	constructor(private http: Http) { }

	getPlayers(): Promise<Player[]> {
		return this.http.get(this.playersUrl)
						.toPromise()
						.then(response => response.json() as Player[])
						.catch(this.handleError);
	}

	private headers = new Headers({'Content-Type': 'application/json'});

	updateByUid(player: Player): Promise<Player> {
		const url = `${this.playersUrl}/user/${player.uid}`;
		return this.http
			.post(url, JSON.stringify(player), { headers: this.headers })
			.toPromise()
			.then(res => res.json())
			.catch(this.handleError);
	}
	updateByMark(player:Player): Promise<Player> {
		const url = `${this.playersUrl}/mark/${player.mark}`;
		return this.http
			.post(url, JSON.stringify({uid:player.uid}), { headers: this.headers })
			.toPromise()
			.then(res => res.json())
			.catch(this.handleError);
	}

	getPlayer(uid: string): Promise<Player> {
		const url = `${this.playersUrl}/user/${uid}`;
	  	return this.http.get(url)
	    	.toPromise()
	    	.then(response => response.json() as Player)
			.catch(this.handleError);
	}

	private handleError(error: any): Promise<any> {
	 	console.error('An error occurred', error); // for demo purposes only
	  	return Promise.reject(error.message || error);
	}

}