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
        const inputName = document.getElementById('input-name') as HTMLInputElement;
        const inputUbication = document.getElementById('input-ubication') as HTMLInputElement;
        const inputUser = document.getElementById('input-user') as HTMLInputElement;
        const inputPassword = document.getElementById('input-password') as HTMLInputElement;
        const btnForm = document.getElementById('btn-form') as HTMLButtonElement;
        //#endregion

        //#region OBSERVABLES
        const inputNameChange$ = fromEvent(inputName, 'input').pipe(map((event:Event) => (<HTMLInputElement> event.target).value), takeUntil(this.destroy$));                                                 
        const inputUbicationChange$ = fromEvent(inputUbication, 'input').pipe(map((event:Event) => (<HTMLInputElement> event.target).value), takeUntil(this.destroy$));
        const inputUserChange$ = fromEvent(inputUser, 'input').pipe(map((event:Event) => (<HTMLInputElement> event.target).value), takeUntil(this.destroy$));
        const inputPasswordChange$ = fromEvent(inputPassword, 'input').pipe(map((event:Event) => (<HTMLInputElement> event.target).value), takeUntil(this.destroy$));
        const btnFormClick$ = fromEvent(btnForm, 'click');
        //#endregion

        inputNameChange$.subscribe({
            next: (value) => {
                this.formValue.name = value;
            }
        });

        inputUbicationChange$.subscribe({
            next: (value) => {
                this.formValue.ubication = value;
            }
        });

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
            next: (event) => {
                event.preventDefault();    
                window.location.hash = "#/device";        
                window.location.href = "#/device";
            }
        })
    }

    cleanEvents(): void {

        this.destroy$.next();
        this.destroy$.complete()
    }

}