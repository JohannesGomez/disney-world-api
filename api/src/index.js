import server from './app';
import { conn } from './dataBase';
import {addGenders} from './libs/initialSetup'

conn.sync({ force:true}).then(() => { // Syncing all the models at once.
     server.listen(process.env.PORT, () => {
      addGenders();
     console.log('Server listening on Port:', process.env.PORT); 
    });
 });


