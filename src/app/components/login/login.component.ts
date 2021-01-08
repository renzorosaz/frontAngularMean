import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    providers: [UserService]
})

export class LoginComponent implements OnInit {
    public title: string;
    public user: User;
    public status: string;
    public identity;
    public token;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService

    ) {
        this.title = 'Identificate';
        this.user = new User(
            "",
            "",
            "",
            "",
            "",
            "",
            "ROLE_USER",
            ""
        );

    }
    ngOnInit() {
        console.log('Componente de login cargado...');
    }

    onSubmit() {
        // console.log(this.user);
        //loguear al usuario y conseguir sus datos

        this._userService.signup(this.user).subscribe(
            response => {
                this.identity = response.user;


                if (!this.identity || !this.identity._id) {
                    this.status = 'error';
                }
                else {
                    this.status = 'success';

                    //persistir datos del usuario
                    localStorage.setItem('identity',JSON.stringify(this.identity)); 
                    //conseguir el token
                    this.getToken();
                }

            },
            error => {
                var errorMessage = <any>error;
                console.log(errorMessage);

                if (errorMessage != null) {
                    this.status = 'error';
                }
            }
        );
    }

    getToken() {
        this._userService.signup(this.user, 'true').subscribe(
            response => {
                this.token = response.token;

                if (this.token.length <= 0) {
                    this.status = 'error';
                }
                else {
                    this.status = 'success';
                    //persistir token del usuario
                    localStorage.setItem('token',this.token);
                    //conseguir los contadores o estadisticas del usuario
                }

            },
            error => {
                var errorMessage = <any>error;
                console.log(errorMessage);

                if (errorMessage != null) {
                    this.status = 'error';
                }
            }
        );
    }
}