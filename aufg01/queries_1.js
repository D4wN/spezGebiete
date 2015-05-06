//INSERT INTO zips VALUES ('Minden', 25000)
db.zips.insert({
    city: "Minden",
    zip: "25000"
})
db.zips.find({city: "Minden"});

//SELECT * FROM zips
db.zips.find();

//SELECT city, pop FROM zips
db.zips.find({}, {
    city: 1,
    pop: 1
});

//SELECT city, pop FROM zips WHERE pop = 33
db.zips.find({
    pop: 33
    }, {
    city: 1,
    pop: 1
});

//SELECT * FROM zips WHERE pop > 33
db.zips.find({
    pop: {
        $gt: 33
    }
});

//SELECT * FROM zips WHERE pop <= 33
db.zips.find({
    pop: {
        $lte: 33
    }
});

//SELECT * FROM zips WHERE pop > 33 AND pop < 40
db.zips.find({
    pop: {
        $gt: 33,
        $lt: 40
    }
});

//SELECT * FROM zips WHERE pop = 32 AND city = ‘Bob’
db.zips.find({
    pop: 32,
    city: "Bob"
});

//SELECT * FROM zips WHERE pop = 33 OR city = ‘Bob’
db.zips.find({
    $or: [{
        pop: 33
    }, {
        city: "Bob"
    }]
});

//SELECT * FROM zips WHERE pop = 33 ORDER BY city ASC
db.zips.find({
    pop: 33
}).sort({
    city: 1
});

//SELECT * FROM zips ORDER BY city DESC
db.zips.find().sort({
    city: -1
});

//SELECT * FROM zips WHERE city LIKE '%inde%'
db.zips.find({
    city: /inde/
});

//SELECT * FROM zips WHERE city LIKE 'inde%'
db.zips.find({
    city: /^inde/
});

//SELECT * FROM zips LIMIT 10 SKIP 20
db.zips.find().limit(10).skip(20)

//SELECT * FROM zips LIMIT 1
db.zips.find().limit(1)

//SELECT DISTINCT city FROM zips
db.zips.distinct("city")

//SELECT COUNT(*) FROM zips
db.zips.count()

//SELECT COUNT(*) FROM zips WHERE pop > 30
db.zips.count({
    pop: {
        $gt: 30
    }
})

//SELECT COUNT(pop) FROM zips
db.zips.count({
    pop: {
        $exists: true
    }
})

//UPDATE zips SET pop = 33 WHERE city = 'Minden'
db.zips.update(
    {
        city: "Minden"
    },{
    $set: {
        pop: 33
    }},{
        multi: true
    }
)

//UPDATE zips SET pop = pop + 2 WHERE city = 'Bob'
db.zips.update(
    {
        city: "Bob"
    },{
        $inc: {
            pop: 2
        }},{
        multi: true
    }
)

//DELETE FROM zips WHERE city = 'Minden'
db.zips.remove({
    city: "Minden"
})

//CREATE INDEX ON zips (city ASC)
db.zips.createIndex({
    city: 1
})

//CREATE INDEX ON zips (city ASC, pop DESC)
db.zips.createIndex({
    city: 1,
    pop: -1
})

//EXPLAIN SELECT * FROM zips WHERE pop = 32
db.zips.find({
        pop: 33
}).explain()
