const IP_SERVER = 'localhost';
const portDB = 27017;
const nameDB = 'super-cafe';

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = `mongodb://${IP_SERVER}:${portDB}/${nameDB}`;
} else {
    urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;
