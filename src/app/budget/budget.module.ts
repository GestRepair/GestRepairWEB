import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from "@angular/http";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
//component
import { BudgetListComponent } from "app/budget/list/list.budget.component";
//service
import { BudgetService } from "app/budget/budget.service";
/**
 * Declaração de componentes e serviços associados aos orçamentos
 */
@NgModule({
    declarations: [
        BudgetListComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule
    ],
    exports: [
        BudgetListComponent
    ],
    providers: [
        BudgetService
    ]
})
export class BudgetModule { }
