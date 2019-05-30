// Rozpoczęcie pomiaru czasu
var trialStart = 0;
// Ilość prób
var howManyTrials = 5;
// Tablica reakcji
var reactionTimes = [];
// Zakończenie pomiaru
var trialEnd = 0;
// Określenie numeru próby
var trialCounter = 0;
// Zmienna losowa
var randomTimer = 0;


// Resetowanie czasu
function ResetTimes() {
    for (var i = 0; i < howManyTrials; i++) {
        reactionTimes[i] = 0;
    }
}

// Rozpoczęcie odliczania do pomiaru czasu
function StartIdle() {
    document.getElementById("button").src = "Images/buttonBlue.png";
    document.getElementById("button").onclick = function () {
        FalseStart();
    };

    if (trialCounter > howManyTrials - 1) {
        ResetTimes();
        trialCounter = 0;

        UpdateTable(0);
    }

    trialCounter++;
    randomTimer = Math.floor(Math.random() * 1000 + 500);
    setTimeout(StartTimer, randomTimer);
}

//Rozpoczęcie czasu reakcji
function StartTimer() {
    document.getElementById("button").src = "Images/buttonGreen.png";
    document.getElementById("button").onclick = function () { StopTimer(); };
    trialStart = new Date().getTime();
}

//Falstart
function FalseStart() {
    trialStart = new Date().getTime() - 1000;
    StopTimer();
}
// Zatrzymanie pomiaru
function StopTimer() {
    document.getElementById("button").src = "Images/buttonRed.png";
    document.getElementById("button").onclick = function () { StartIdle(); };

    var average = 0;

    trialEnd = new Date().getTime() - trialStart;
    reactionTimes[trialCounter - 1] = trialEnd;

    UpdateTable(average);

    if (trialCounter > howManyTrials - 1) {
        for (var i = 0 ; i < trialCounter ; i++) {
            average += reactionTimes[i];
        }

        average = Math.round(average / howManyTrials);
        UpdateTable(average);
        alert("Twój średni czas: " + average + " ms");
    }
}
// Aktualizacja tabeli
function UpdateTable(average) {
    document.getElementById("timesTable").innerHTML = "";

    document.getElementById("timesTable").innerHTML +=
        '<tr>' +
            '<th> Numer próby </th>' +
            '<th> Czas reakcji </th>' +
        '</tr>';

    for (var i = 0 ; i < howManyTrials ; i++) {
        document.getElementById("timesTable").innerHTML +=
            '<tr>' +
                '<td> Próba ' + (i + 1) + ' </td>' +
                '<td>' +
                reactionTimes[i] +
                ' ms </td>' +
             '</tr>';
    }

    document.getElementById("timesTable").innerHTML +=
        '<tr>' +
            '<td> Średnia: </td>' +
    '<td>' + average + ' ms </td>' +
        '</tr>';
}

