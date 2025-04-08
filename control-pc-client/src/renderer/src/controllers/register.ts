/// <reference types="vite/client" />
import { fromEvent, map, Subject, Subscription, takeUntil } from "rxjs";
import { Component } from "../strategy/component-stategy-interface";
import template from "../views/register.html?raw";
import { IRegisterForm } from "../interfaces/register-form.interface";

export class RegisterComponent implements Component{

    listeners: Subscription[] = [];
    destroy$ = new Subject<void>();
    formValue:IRegisterForm = {
        name: '',
        password: '',
        ubication: '',
        user: ''
    };

    getTemplate(): string {
        return template;
    }

    insertController(): void {

        this.configureForm();

    }

    configureForm(){

        //#region NODE ELEMENTS
        const inputUser = document.getElementById('input-user') as HTMLInputElement;
        const inputPassword = document.getElementById('input-password') as HTMLInputElement;
        const btnForm = document.getElementById('btn-form') as HTMLButtonElement;
        //#endregion

        //#region OBSERVABLES
        const inputUserChange$ = fromEvent(inputUser, 'input').pipe(map((event:Event) => (<HTMLInputElement> event.target).value), takeUntil(this.destroy$));
        const inputPasswordChange$ = fromEvent(inputPassword, 'input').pipe(map((event:Event) => (<HTMLInputElement> event.target).value), takeUntil(this.destroy$));
        const btnFormClick$ = fromEvent(btnForm, 'click');
        //#endregion

        inputUserChange$.subscribe({
            next: (value) => {
                this.formValue.user = value;
            }
        });

        inputPasswordChange$.subscribe({
            next: (value) => {
                this.formValue.password = value;
            }
        });

        btnFormClick$.subscribe({
            next: async (event) => {

                const response = await window.api.invoke('user:register', this.formValue);
                
                window.location.href = "/device";
            }
        })
    }

    cleanEvents(): void {

        this.destroy$.next();
        this.destroy$.complete()
    }

}