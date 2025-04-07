import router from "./routes/index.routes";


router('device');

window.addEventListener('hashchange', () =>{
  router(window.location.hash);
})