const IP_SERVER = 'localhost';
const portDB = 27017;
const nameDB = 'super-cafe';

/*Entorno */
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

/*Vencimiento del token */
process.env.CADUCIDAD_TOKEN = '30d';

/**Seed */
process.env.SEED = process.env.SEED || 'secret';

let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = `mongodb://${IP_SERVER}:${portDB}/${nameDB}`;
} else {
    urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;
