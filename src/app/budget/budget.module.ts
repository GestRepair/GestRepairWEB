import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from "@angular/http";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
//component
import { BudgetListComponent } from "app/budget/list/list.budget.component";
import { BudgetInfoComponent } from "app/budget/info/info.budget.component";
//service
import { BudgetService } from "app/budget/budget.service";

@NgModule({
    declarations: [
        BudgetListComponent,
        BudgetInfoComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule
    ],
    exports: [
        BudgetListComponent,
        BudgetInfoComponent
    ],
    providers: [
        BudgetService
    ]
})
export class BudgetModule { }
