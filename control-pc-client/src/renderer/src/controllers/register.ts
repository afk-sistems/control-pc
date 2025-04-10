/// <reference types="vite/client" />
import { fromEvent, map, Subject, Subscription, takeUntil } from "rxjs";
import { Component } from "../strategy/component-stategy-interface";
import template from "../views/register.html?raw";
import { IRegisterForm } from "../interfaces/register-form.interface";

export class RegisterComponent implements Component{

    listeners: Subscription[] = [];
    destroy$ = new Subject<void>();
    formValue:IRegisterForm = {
        email: '',
        password: ''
    };

    getTemplate(): string {
        return template;
    }

    insertController(): void {

        this.configureForm();

    }

    configureForm(){

        //#region NODE ELEMENTS
        const inputEmail = document.getElementById('input-email') as HTMLInputElement;
        const inputPassword = document.getElementById('input-password') as HTMLInputElement;
        const btnForm = document.getElementById('btn-form') as HTMLButtonElement;
        //#endregion

        //#region OBSERVABLES
        const inputEmailChange$ = fromEvent(inputEmail, 'input').pipe(map((event:Event) => (<HTMLInputElement> event.target).value), takeUntil(this.destroy$));
        const inputPasswordChange$ = fromEvent(inputPassword, 'input').pipe(map((event:Event) => (<HTMLInputElement> event.target).value), takeUntil(this.destroy$));
        const btnFormClick$ = fromEvent(btnForm, 'click');
        //#endregion

        inputEmailChange$.subscribe({
            next: (value) => {
                this.formValue.email = value;
            }
        });

        inputPasswordChange$.subscribe({
            next: (value) => {
                this.formValue.password = value;
            }
        });

        btnFormClick$.subscribe({
            next: async (event) => {

                event.preventDefault();

                const response = await window.api.invoke('user:register', this.formValue);

                if(response.error){
                    alert('Ocurrio un error al contactar al servidor');
                }else{
                    window.location.href = "/device";
                }
            }
        })
    }

    cleanEvents(): void {

        this.destroy$.next();
        this.destroy$.complete()
    }

}