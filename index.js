require('./config/config');
const mongoose = require('mongoose');
const app = require('./app');
const port = process.env.PORT || 4000;


mongoose.connect(
    process.env.URLDB,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    },
    (err) => {
        if (err) {
            throw err;
        } else {
            console.log(
                'La conexion a la base de datos es correcta'
            );
            app.listen(port, () => {
                console.log(
                    `http://localhost:${port}/api/v1/`
                );
            });
        }
    }
);
