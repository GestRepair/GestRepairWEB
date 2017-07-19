import { Component, Input } from '@angular/core';
import { Router } from "@angular/router";

import { User } from '../user';

@Component({
    templateUrl: './activate.user.component.html',
    styleUrls: ['./activate.user.component.css']
})

export class UserActivateComponent {
    title = 'Registo com Sucesso';
}
