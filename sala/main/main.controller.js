import { urlsMain} from './main.api.js';
import {updateReporte } from './main.componentes.js';

const token = localStorage.getItem("token");
const user = localStorage.getItem("user");
const urls = urlsMain();

function getDatoGeneral(id) {
    const url = urls.general;
    fetch(`${url}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
   .then(response => response.json())
   .then(data => {
      //...
      updateReporte(data);
    })
   .catch(error => console.error(error));
  }

  export { getDatoGeneral };