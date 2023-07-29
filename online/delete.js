const dbConnect = require('./mongodb');

const deleteData = async () => {

    const db = await dbConnect();
    const result = await db.deleteOne({name:'max 3'});
    console.log(result);

    if (result.acknowledged) {
        console.log('record deleted');
    }

}

deleteData();