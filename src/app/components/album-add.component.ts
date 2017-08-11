import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { UserService } from '../services/user.service';
import { ArtistService } from '../services/artist.service';
import { AlbumService } from '../services/album.service';
import { GLOBAL } from '../services/global';
import { Artist } from '../models/artist';
import { Album } from '../models/album';


@Component({
	selector: 'album-add',
	templateUrl: '../views/album-add.html',
	providers:[UserService,ArtistService,AlbumService]
})

export class AlbumAddComponent implements OnInit{
	public titulo: string;
	public identity;
	public token;
	public url: string;
	public album: Album;
	public artist: Artist;
	public alertMessage;



	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _userService: UserService,
		private _artistService: ArtistService,
		private _albumService: AlbumService
		){

		this.titulo = 'Crear un Nuevo Album';
		this.identity = this._userService.getIdentity();
		this.token = this._userService.getToken();
		this.url = GLOBAL.url;
		this.album = new Album('','',2017,'','');

	}

	ngOnInit(){
		console.log('album-add.Component.ts cargado');


	}

	onSubmit(){
		this._route.params.forEach((params: Params)=>{
			let artist_id = params['artist'];
			this.album.artist = artist_id;


			this._albumService.addAlbum(this.token,this.album)
					.subscribe(
						response => {
				
							if(!response.album){
								alert('Error en el servidor');
								this.alertMessage = 'Error en el servidor';

							}else{
								this.alertMessage = 'El album se ha creado correctamente!';
								this.album = response.album;
								this._router.navigate(['/editar-album', response.album._id]);
							}
						},
						error => {
							var errorMessage = <any>error;
				 			if(errorMessage != null){
				 				var body = JSON.parse(error._body);
				 				this.alertMessage = body.message;
				 				console.log(error);
				 			}
						}

					);
			
		});
		
	}
}