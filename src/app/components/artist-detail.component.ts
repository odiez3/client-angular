import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { UserService } from '../services/user.service';
import { ArtistService } from '../services/artist.service';
import { GLOBAL } from '../services/global';
import { Artist } from '../models/artist';


@Component({
	selector: 'artist-detail',
	templateUrl: '../views/artist-detail.html',
	providers:[UserService,ArtistService]
})

export class ArtistDetailComponent implements OnInit{
	public titulo: string;
	public identity;
	public token;
	public url: string;
	public artist: Artist;
	public alertMessage;


	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _userService: UserService,
		private _artistService: ArtistService,
		){

		this.identity = this._userService.getIdentity();
		this.token = this._userService.getToken();
		this.url = GLOBAL.url;

	}

	ngOnInit(){
		console.log('artis-add.Component.ts cargado');

		//llamar al metedo del api para sacar un artista
		//en base a su id getArtist
		this.getArtist();

	}

	getArtist(){
		this._route.params.forEach((params: Params)=>{
			let id = params['id'];
			this._artistService.getArtist(this.token,id).
			subscribe(
				response => {
					
					if(!response.artist){
						this._router.navigate(['/']);
					}else{
						this.artist = response.artist;

						//Scar los albums del artista
						
					}
				},
				error=>{
					var errorMessage = <any>error;
		 			if(errorMessage != null){
		 				var body = JSON.parse(error._body);
		 				//this.alertMessage = body.message;
		 				console.log(error);
		 			}
				}

				);
		});
		
	}

}