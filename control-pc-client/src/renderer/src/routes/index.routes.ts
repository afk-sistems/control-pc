import { ComponentHandler } from '../strategy/component-handler';
import {DeviceComponent} from '../controllers/device';
import {RegisterComponent} from '../controllers/register';

import page from "page";

const componentHandler = new ComponentHandler();

// page('/', () => {
//     componentHandler.setComponent(new DeviceComponent());
// })

page('/', () => {
    componentHandler.setComponent(new RegisterComponent());
})

page('/device', () => {
    componentHandler.setComponent(new DeviceComponent());
})

page();
