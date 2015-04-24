function handleResponse(result) {
    console.log("handleResponse" + result);

    var synonyms = "";
    for (var synsetCount = 0; synsetCount < result.synsets.length; synsetCount++) {
        for (var termCount = 0; termCount < result.synsets[synsetCount].terms.length; termCount++) {
            var termObj = result.synsets[synsetCount].terms[termCount];
            synonyms += termObj.term
            if (termObj.level) {
                synonyms += " (" + termObj.level + ")";
            }
            synonyms += ", "
        }
        synonyms += "<br/><br/>";
    }
    console.log(synonyms);
}
