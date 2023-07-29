const dbConnect = require('./mongodb');

const update = async () => {

    const db = await dbConnect();
    const result = await db.updateOne(

        {name:'i phone 13 pro max'},
        {$set: {name:'i phone 14 pro max',price:170}
        }

    )

    console.log(result);

    if (result.modifiedCount > 0) {
        console.log('data updated');
    }

}

update();