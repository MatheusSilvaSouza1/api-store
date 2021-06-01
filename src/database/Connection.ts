import { createConnection } from 'typeorm'

createConnection()
    .then(() => {
        console.log('db connect');
    })
    .catch(error => {
        console.log(error);

    })
