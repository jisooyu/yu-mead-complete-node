// CRUD create read update delete

// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient

const { MongoClient, ObjectID } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'jisooyu'

const id = new ObjectID()
console.log(id)
console.log(id.getTimestamp())

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {

    if (error) {
        return console.log('Unable to connect to database!')
    }

    const db = client.db(databaseName)

    // db.collection('users').insertOne({
    //     name:'Jisoo',
    //     age: '68'
    // }, (error, result)=> {
    //     if (error){
    //         return console.log("unable to insert user")
    //     }
    //     console.log(result.ops)
    // })

    // db.collection('users').insertMany([
    //     {
    //         name: '최경희',
    //         age: 66
    //     },
    //     {
    //         name: '정민',
    //         age: 10
    //     },
    //     {
    //         name: '재민',
    //         age: 9
    //     }
    // ], (error, result)=> {
    //     if (error){
    //         return console.log("Unable to insert users")
    //     }
        
    //     console.log(result.ops)
    // })

    // db.collection('users').deleteMany({
    //     age: 27
    // }).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })

    // db.collection('tasks').deleteOne({
    //     description: "Clean the house"
    // }).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })
})