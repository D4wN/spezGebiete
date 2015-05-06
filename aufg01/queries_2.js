/**
 * Created by Marv on 06.05.2015.
 */


//1. Wie lauten die eindeutigen Namen der �Folder� der E-Mails?
db.mail.find({},{
    fpatch: 1
})
//oder NAME
db.mail.find({},{
    fname: 1
})
//2. Wieviel E-Mails wurden mit der Adresse �rosalee.fleming@enron.com� gesendet?
db.mail.count({
    sender: "rosalee.fleming@enron.com"
})

//3. Was ist die E-Mail mit der h�chsten Anzahl an Rezipienten und was ist der Nachrichtentext der E-Mail?
db.mail.find({},{text:1}).sort({recipients: -1}).limit(1)

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
    }
})