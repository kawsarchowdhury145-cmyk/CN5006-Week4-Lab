const mongoose = require('mongoose');

const MONGO_URI = 'mongodb://localhost:27017/Week8';

// Person schema, extended with a new city field
const PersonSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: Number,
    gender: String,
    salary: Number,
    city: String
});

const Person = mongoose.model(
    'modelname',
    PersonSchema,
    'personCollection'
);

// Insert records that include the city field
async function insertWithCity() {

    const people = [
        { name: 'Aisha', age: 29, gender: 'Female', salary: 3200, city: 'London' },
        { name: 'Daniel', age: 35, gender: 'Male', salary: 4100, city: 'Manchester' },
        { name: 'Priya', age: 31, gender: 'Female', salary: 3800, city: 'London' },
        { name: 'Tom', age: 41, gender: 'Male', salary: 2900, city: 'Leeds' },
        { name: 'Sara', age: 26, gender: 'Female', salary: 3500, city: 'London' }
    ];

    const result = await Person.insertMany(people);

    console.log('Records with city inserted');
    console.log(result);
}

// Find only the people from a specific city
async function findByCity() {

    const givenCity = 'London';

    const docs = await Person.find({ city: givenCity })
        .select('name age city');

    console.log(`People living in ${givenCity}:`);

    docs.forEach(doc => {
        console.log(doc.name, doc.age, doc.city);
    });
}

async function main() {

    try {

        await mongoose.connect(MONGO_URI);
        console.log(`Connected to ${MONGO_URI}`);

        // insertWithCity() was already run in the previous step
        await findByCity();

    } catch (err) {

        console.error('Error:', err);

    } finally {

        await mongoose.connection.close();
        console.log('Connection closed');

    }
}

main();