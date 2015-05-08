/**
 * Created by Marv on 08.05.2015.
 */
/**
 * Jedes Dokument der E-Mail-Collection enthält ein Feld für den Sender und die Rezipienten.
 * Ziel dieser Aufgabe ist es, mit dem MapReduce-Verfahren die Menge der eindeutigen
 * Sender/Rezipienten-Paare zu ermitteln (Map) und zu zählen, wie oft diese Paare vorhanden sind (Reduce).
 * Geben Sie die Liste geordnet aus, so dass das Paar, das am häufigsten auftaucht, zuerst ausgegeben wird.
 */
//Version Roland: Sender+Recipient(1x) PAARE
//1. Mappe Sender+Recipients
db.mail.mapReduce(
    function(){
        if(Array.isArray(this.recipients)){
            for(i=0; i< this.recipients.length; i++){
                emit({sen: this.sender, rec: this.recipients[i]}, 1);
            }
        } else {
            emit({sen: this.sender, rec: this.recipients}, 1);
        }

    },
    function(key, values) {
        var sum = 0;
        for(var i = 0; i< values.length; i++){
            sum+= values[i];
        }
        return sum;
    }, {
        out: "mail_map"
    }
)

//Sortieren
db.mail_map.find({}).sort({
    value: -1
});