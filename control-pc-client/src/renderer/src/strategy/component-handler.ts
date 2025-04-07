import { Component } from "./component-stategy-interface";

export class ComponentHandler{

    private component!:Component;
    

    setComponent(component:Component){

        if(this.component){
            this.component.cleanEvents();
        }

        this.component = component;
        document.getElementById('app')!.innerHTML = this.component.getTemplate();
        this.component.insertController();
    }

}