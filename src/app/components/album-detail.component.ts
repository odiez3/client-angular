import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { UserService } from '../services/user.service';
import { AlbumService } from '../services/album.service';
import { GLOBAL } from '../services/global';
import { Artist } from '../models/artist';
import { Album } from '../models/album';


@Component({
	selector: 'album-detail',
	templateUrl: '../views/album-detail.html',
	providers:[UserService,AlbumService]
})

export class AlbumDetailComponent implements OnInit{
	public album: Album;
	public identity;
	public token;
	public url: string;
	public artist: Artist;
	public alertMessage;
	public albums: Album[];


	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _userService: UserService,
		private _albumService: AlbumService
		){

		this.identity = this._userService.getIdentity();
		this.token = this._userService.getToken();
		this.url = GLOBAL.url;

	}

	ngOnInit(){
		console.log('album-detail.Component.ts cargado');

		//Sacar album de la bdd
		this.getAlbum();

	}

	getAlbum(){
		console.log("el metood funciona");
		this._route.params.forEach((params: Params)=>{
			let id = params['id'];
			this._albumService.getAlbum(this.token,id).
			subscribe(
				response => {
					
					if(!response.album){
						this._router.navigate(['/']);
					}else{
						this.album = response.album;

						//Scar los albums del artista
						/*this._albumService.getAlbums(this.token,response.artist._id).
							subscribe(
								response =>{
									
									if(!response.albums){
										this.alertMessage = 'Este artist no tiene albums';
									}else{
										this.albums = response.albums;
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

							);*/
						
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