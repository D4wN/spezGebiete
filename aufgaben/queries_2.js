/**
 * Created by Marv on 06.05.2015.
 */


//1. Wie lauten die eindeutigen Namen der „Folder“ der E-Mails?
db.mail.aggregate([{
    $group :{
        _id :"$folder"
    }
}])
//2. Wieviel E-Mails wurden mit der Adresse “rosalee.fleming@enron.com“ gesendet?
db.mail.count({
    sender: "rosalee.fleming@enron.com"
})

//3. Was ist die E-Mail mit der höchsten Anzahl an Rezipienten und was ist der Nachrichtentext der E-Mail?
db.mail.aggregate(
    [
        {
            $project: {
                message: "$text",
                datum: "$date",
                rec_count: { $size: "$recipients" }
            }
        },
        {
            $sort: { rec_count : -1}
        },
        {
            $limit: 1
        }
    ]
)

//4. Wieviel E-Mails enthalten genau einen Sender und genau einen Rezipienten?
db.mail.count({
    recipients: {
        $size: 1
    },
    sender: {
        $exists: true
    }
})

//5. Wieviel E-Mails wurde im Jahr 2001 versendet?
db.mail.count({
    date: {
        $gte: "2001-01-01T00:00:00.000Z",
        $lt: "2002-01-01T00:00:00.000Z"
    },
    folder : "_sent"
})