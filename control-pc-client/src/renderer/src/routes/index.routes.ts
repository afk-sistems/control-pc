import { ComponentHandler } from '../strategy/component-handler';



const componentHandler = new ComponentHandler();

export default async (router:string) => {

        const routeWithoutHash = router.replace('#/', "");              

        switch(routeWithoutHash){

            case 'register': 
                import('../controllers/register').then(m=>{
                    const Component =  m.RegisterComponent;
                    componentHandler.setComponent(new Component());
                });
                break;
            case 'device':                
                import('../controllers/device').then(m=>{
                    const Component =  m.DeviceComponent;
                    componentHandler.setComponent(new Component());
                });
                break;
        }

}