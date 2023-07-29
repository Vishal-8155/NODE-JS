const dbConnect = require('./mongodb');

const insert = async () => {

    const db = await dbConnect();
    const result = await db.updateOne(

        {name:'i phone 13 pro max'},{
            $set: {name:'i phone 14 pro max',price:170}
        }

    )

    if (result.modifiedCount > 0) {
        console.log('data updated');
    }

}

insert();