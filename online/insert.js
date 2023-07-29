const dbConnect = require('./mongodb');

const insert = async () => {

    const db = await dbConnect();
    const result = await db.insertMany(

        [
            { name: 'max 1', brand: 'micromax', price: 120, category: 'mobile' },
            { name: 'max 2', brand: 'micromax', price: 220, category: 'mobile' },
            { name: 'max 3', brand: 'micromax', price: 320, category: 'mobile' }
        ]

    );

    console.log(result);

    if (result.acknowledged) {
        console.log('data inserted');
    }

}

insert();