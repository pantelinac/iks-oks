/**
 * COOKIE SETTER
 * @param cname
 * @param cvalue
 * @param exdays
 */
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

/**
 * COOKIE GETTER
 * @param cname
 * @returns {string}
 */
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function SinglePlayer(WPlayFirst, Nick, Play, UntilNow) {
    var WhoPlayFirst = WPlayFirst;
    var UserNick = Nick;
    var play = Play;
    var move = 1;
    var WhoLastPlay = WPlayFirst;
    var numPlayer = 1;

    var Time = 0;
    /**
     * Definisanje slobodnih polaj i odigranih polja za oba igraca
     */
    if (UntilNow == 1) {
        var EmptyFields = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        var FirstPlayerCells = [];
        var SecoundPlayerCells = [];
    }

    //Ako je ko igra prvi prazno, ukljucuje sa random

    if (WhoPlayFirst == 0) {
        var WhoPlayFirst = Math.floor(Math.random() * 2);
        WhoPlayFirst = WhoPlayFirst;
    } else {
        var WhoPlayFirst = WPlayFirst;
    }


    //Ako je racunar prvi
    if (WhoPlayFirst == 1) {
        $('#whoPlayFirst').text('Ovu partiju RACUNAR igra prvi');
        ComputerPlayFirst()
    } else {
        $('#whoPlayFirst').text('Ovu partiju ' + UserNick + ' igra prvi');
    }

    /**
     * Prikazivanje poslednjih 5 rezultata
     */
    function AjaxGetResult() {
        $.ajax({
            method: "POST",
            url: "./api/GetLastFiveResult",
            data: {first_player_nick: "Racunar", secound_player_nick: UserNick, "_token": $('meta[name="csrf-token"]').attr('content'),}
        })
            .done(function (data) {
                //alert(data)
                var jsonWinner = JSON.parse(data);
                $('#LastFiveResult').html('');
                jQuery.each(jsonWinner, function () {
                    if (this['winner'] == 1) {
                        $('#LastFiveResult').append('<h6 style="color: greenyellow;">Pobedio je: Racunar<h6>')

                    } else if (this['winner'] == 2) {
                        $('#LastFiveResult').append('<h6 style="color: red;">Pobedio je: ' + UserNick + '<h6>')
                    } else {
                        $('#LastFiveResult').append('<h6>Rezultat je: NERESENO<h6>')
                    }
                });
            });
    }

    AjaxGetResult();


    //Kada Computer igra sa iks
    function ComputerPlayFirst() {
        checkForWinnerCombination();
        setTimeout(function () {
            if (play === false) {

            } else {
                var randromNum = random_item(EmptyFields);
                var randomNumForRemove = randromNum;
                if ($('#' + randromNum).text() == "" && play) {
                    $('#' + randromNum + '').append('X');
                    removeFromArray(EmptyFields, parseInt(randomNumForRemove));
                    FirstPlayerCells.push(randromNum);
                    if (checkForWinnerCombination() == true) {
                        play = false;
                        FirstPlayerCells = [];
                        SecoundPlayerCells = [];
                    }
                    move++;
                }
            }
        }, 250)
    }

    //Kada racunar igra sa OKS
    function ComputerPlayFirstO() {
        checkForWinnerCombination();
        setTimeout(function () {
            if (play === false) {

            } else {
                var randromNum = random_item(EmptyFields);
                var randomNumForRemove = randromNum;
                if ($('#' + randromNum).text() == "" && play) {
                    $('#' + randromNum + '').append('O');
                    removeFromArray(EmptyFields, parseInt(randomNumForRemove));
                    FirstPlayerCells.push(randromNum);
                    if (checkForWinnerCombination() == true) {
                        play = false;
                        FirstPlayerCells = [];
                        SecoundPlayerCells = [];
                    }
                    move++;
                }
            }
        }, 250)


    }


    $(".cell").click(function () {

        if ($(this).text() == "" && play) {
            if ((move % 2) == 1) {
                //Dodavanje iksa u polje
                $(this).append("X");
                //Uzimanje id-a tog polja
                var id = $(this).attr('id');
                //Konvertovanje id-a u integer
                var converting_id = parseInt(id)
                SecoundPlayerCells.push(converting_id);
                //Brisanje iz niza
                removeFromArray(EmptyFields, converting_id);
                //Ako je broj igraca jedan sa jedan prepusanje poteza racunaru da igra sa oks
                if (numPlayer == 1) {
                    ComputerPlayFirstO();
                }
            }
            else {
                //Dodavanje OKS-a
                $(this).append("O");
                //Uzimanje id-a
                var id = $(this).attr('id')
                //Konvertovanje u integer
                var converting_id = parseInt(id);
                SecoundPlayerCells.push(converting_id);
                //Brisanje iz niza
                removeFromArray(EmptyFields, converting_id);

                //Ako je broj igraca jedan sa jedan prepusanje poteza racunaru da igra sa Iks
                if (numPlayer == 1) {
                    ComputerPlayFirst();
                }
            }
            if (checkForWinnerCombination() == true) {
                play = false;
                FirstPlayerCells = [];
                SecoundPlayerCells = [];
            }

            //Povecavanje poteza za 1
            move++;

        }
    });


    /**
     * Brisanje odrejenog clana niza
     */
    function removeFromArray(array, element) {
        var index = array.indexOf(element);
        array.splice(index, 1);
    }

    /**
     * Nasumicno vramaca nekog clana niza
     */
    function random_item(items) {
        return items[Math.floor(Math.random() * items.length)];
    }

    /**
     * Provera da li niz sadrzi odredjeni element
     */
    function arche(array, element) {
        if (array.indexOf(element) != -1) {
            return true;
        } else {
            return false;
        }
    }


    /**
     * Modal Show
     */
    function ModelShow(Winner) {
        if (Winner == 1) {
            var OldCookie = getCookie(1) + 1;
            setCookie(1, OldCookie, 30)
            $('#WinnerIs').text('Pobednik je Racunar(' + getCookie(1).length + ':' + getCookie(2).length + ')');
        } else if (Winner == 2) {
            //$('#WinnerIs').text('Pobednik je ' + UserNick);
            var OldCookie = getCookie(2) + 1;
            setCookie(2, OldCookie, 30)
            $('#WinnerIs').text('Pobednik je ' + UserNick + '(' + getCookie(2).length + ':' + getCookie(1).length + ')');
        } else if (Winner == 0) {
            $('#WinnerIs').text('NERESENO');
            var OldCookie = getCookie(0) + 1;
            setCookie(0, OldCookie, 30)
            // $('#WinnerIs').text('Pobednik je ' + UserNick + '(' + getCookie(2).length + ':' + getCookie(1).length + ')');
        }

        // $('#WinnerIs').text('Pobednik je '+Winner);
        if (WhoPlayFirst == 1) {
            setCookie('SinglePlayerWhoPlayNext', 2, 30)

        } else if (WhoPlayFirst == 2) {
            setCookie('SinglePlayerWhoPlayNext', 1, 30)
        }

        var FirstPlayerCellsString = FirstPlayerCells.toString();
        var SecoundPlayerCellsString = SecoundPlayerCells.toString();

        $.ajax({
            method: "POST",
            url: "./api/addPlayersToDB",
            data: {
                first_player_nick: "Racunar",
                secound_player_nick: UserNick,
                winner: Winner,
                time: Time,
                firstfields: FirstPlayerCellsString,
                secoundfields: SecoundPlayerCellsString,
                "_token": $('meta[name="csrf-token"]').attr('content'),
            }
        })
            .done(function (msg) {
                $('#SingleModWinnerModel').modal();
            });

        return false;
    }

    function Timer() {
        setInterval(function () {
            Time += 1;
        }, 1000)
    }

    Timer();

    /**
     * Provera komnacija korisnika
     */
    function checkForWinnerCombination() {
        FirstToStr = String(FirstPlayerCells);
        SecoundToStr = String(SecoundPlayerCells);
        var CheckForEmpyTable = true;
        if (play == false) {
        } else {
            if (arche(FirstPlayerCells, 1) && arche(FirstPlayerCells, 2) && arche(FirstPlayerCells, 3)) {
                $('#1').css('background-color', 'green');
                $('#2').css('background-color', 'green');
                $('#3').css('background-color', 'green');
                CheckForEmpyTable = false;
                play = false;
                ModelShow(1)
                return true;

            } else if (arche(SecoundPlayerCells, 1) && arche(SecoundPlayerCells, 2) && arche(SecoundPlayerCells, 3)) {
                $('#1').css('background-color', 'green');
                $('#2').css('background-color', 'green');
                $('#3').css('background-color', 'green');
                CheckForEmpyTable = false;
                play = false;
                ModelShow(2)
                return true;

            }

            if (arche(FirstPlayerCells, 4) && arche(FirstPlayerCells, 5) && arche(FirstPlayerCells, 6)) {
                $('#4').css('background-color', 'green');
                $('#5').css('background-color', 'green');
                $('#6').css('background-color', 'green');
                CheckForEmpyTable = false;
                play = false;
                ModelShow(1)
                return true;
            } else if (arche(SecoundPlayerCells, 4) && arche(SecoundPlayerCells, 5) && arche(SecoundPlayerCells, 6)) {
                $('#4').css('background-color', 'green');
                $('#5').css('background-color', 'green');
                $('#6').css('background-color', 'green');
                CheckForEmpyTable = false;
                play = false;
                ModelShow(2)
                return true;
            }

            if (arche(FirstPlayerCells, 7) && arche(FirstPlayerCells, 8) && arche(FirstPlayerCells, 9)) {
                $('#7').css('background-color', 'green');
                $('#8').css('background-color', 'green');
                $('#9').css('background-color', 'green');
                CheckForEmpyTable = false;
                ModelShow(1)
                return true;
            } else if (arche(SecoundPlayerCells, 7) && arche(SecoundPlayerCells, 8) && arche(SecoundPlayerCells, 9)) {
                $('#7').css('background-color', 'green');
                $('#8').css('background-color', 'green');
                $('#9').css('background-color', 'green');
                CheckForEmpyTable = false;
                play = false;
                ModelShow(2)
                return true;
            }

            if (arche(FirstPlayerCells, 1) && arche(FirstPlayerCells, 4) && arche(FirstPlayerCells, 7)) {
                $('#1').css('background-color', 'green');
                $('#4').css('background-color', 'green');
                $('#7').css('background-color', 'green');
                CheckForEmpyTable = false;
                ModelShow(1)
                return true;
            } else if (arche(SecoundPlayerCells, 1) && arche(SecoundPlayerCells, 4) && arche(SecoundPlayerCells, 7)) {
                $('#1').css('background-color', 'green');
                $('#4').css('background-color', 'green');
                $('#7').css('background-color', 'green');
                CheckForEmpyTable = false;
                play = false;
                ModelShow(2);
                return true;
            }

            if (arche(FirstPlayerCells, 2) && arche(FirstPlayerCells, 5) && arche(FirstPlayerCells, 8)) {
                $('#2').css('background-color', 'green');
                $('#5').css('background-color', 'green');
                $('#8').css('background-color', 'green');
                CheckForEmpyTable = false;
                play = false;
                ModelShow(1);
                return true;
            } else if (arche(SecoundPlayerCells, 2) && arche(SecoundPlayerCells, 5) && arche(SecoundPlayerCells, 8)) {
                $('#2').css('background-color', 'green');
                $('#5').css('background-color', 'green');
                $('#8').css('background-color', 'green');
                CheckForEmpyTable = false;
                play = false;
                ModelShow(2);
                return true;
            }

            if (arche(FirstPlayerCells, 3) && arche(FirstPlayerCells, 6) && arche(FirstPlayerCells, 9)) {
                $('#3').css('background-color', 'green');
                $('#6').css('background-color', 'green');
                $('#9').css('background-color', 'green');
                CheckForEmpyTable = false;
                play = false;
                ModelShow(1)
                return true;
            } else if (arche(SecoundPlayerCells, 3) && arche(SecoundPlayerCells, 6) && arche(SecoundPlayerCells, 9)) {
                $('#3').css('background-color', 'green');
                $('#6').css('background-color', 'green');
                $('#9').css('background-color', 'green');
                CheckForEmpyTable = false;
                play = false;
                ModelShow(2)
                return true;
            }


            if (arche(FirstPlayerCells, 1) && arche(FirstPlayerCells, 5) && arche(FirstPlayerCells, 9)) {
                $('#1').css('background-color', 'green');
                $('#5').css('background-color', 'green');
                $('#9').css('background-color', 'green');
                CheckForEmpyTable = false;
                play = false;
                ModelShow(1)
                return true;
            } else if (arche(SecoundPlayerCells, 1) && arche(SecoundPlayerCells, 5) && arche(SecoundPlayerCells, 9)) {
                $('#1').css('background-color', 'green');
                $('#5').css('background-color', 'green');
                $('#9').css('background-color', 'green');
                CheckForEmpyTable = false;
                play = false;
                ModelShow(2)
                return true;
            }

            if (arche(FirstPlayerCells, 3) && arche(FirstPlayerCells, 5) && arche(FirstPlayerCells, 7)) {
                $('#3').css('background-color', 'green');
                $('#5').css('background-color', 'green');
                $('#7').css('background-color', 'green');
                CheckForEmpyTable = false;
                play = false;
                ModelShow(1)
                return true;
            } else if (arche(SecoundPlayerCells, 3) && arche(SecoundPlayerCells, 5) && arche(SecoundPlayerCells, 7)) {
                $('#3').css('background-color', 'green');
                $('#5').css('background-color', 'green');
                $('#7').css('background-color', 'green');
                CheckForEmpyTable = false;
                play = false;
                ModelShow(2)
                return true;
            }
            if (CheckForEmpyTable == true) {
                var firstPlusSecoundFields = EmptyFields.length;
                console.log(firstPlusSecoundFields);
                if (firstPlusSecoundFields == 0 && CheckForEmpyTable == true) {
                    play = false;
                    ModelShow(0)
                    return true;
                }
            }


        }
    }

}

function MultiPlayer(WPlayFirst, Nick, SecoundNick, Play, UntilNow) {
    var WhoPlayFirst = WPlayFirst;
    var UserNick = Nick;
    var play = Play;
    var move = 1;
    var WhoLastPlay = WPlayFirst;
    var numPlayer = 1;

    var Time = 0;
    /**
     * Definisanje slobodnih polaj i odigranih polja za oba igraca
     */
    if (UntilNow == 1) {
        var EmptyFields = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        var FirstPlayerCells = [];
        var SecoundPlayerCells = [];
    }

    //Ako je ko igra prvi prazno, ukljucuje sa random

    if (WhoPlayFirst == 0) {
        var WhoPlayFirst = Math.floor(Math.random() * 2);
        WhoPlayFirst = WhoPlayFirst;
    } else {
        var WhoPlayFirst = WPlayFirst;
    }


    //Ako je racunar prvi
    if (WhoPlayFirst == 1) {
        $('#whoPlayFirst').text('Ovu partiju ' + SecoundNick + ' igra prvi');
    } else {
        $('#whoPlayFirst').text('Ovu partiju ' + UserNick + ' igra prvi');
    }

    /**
     * Prikazivanje poslednjih 5 rezultata
     */
    function AjaxGetResult() {

        $.ajax({
            method: "POST",
            url: "./api/GetLastFiveResult",
            data: {first_player_nick: UserNick, secound_player_nick: SecoundNick, "_token": $('meta[name="csrf-token"]').attr('content'),}
        })
            .done(function (data) {
                //alert(data)
                var jsonWinner = JSON.parse(data);
                $('#LastFiveResult').html('');
                jQuery.each(jsonWinner, function () {
                    if (this['winner'] == 1) {
                        $('#LastFiveResult').append('<h6 style="color: greenyellow;">Pobedio je: ' + SecoundNick + '<h6>')

                    } else if (this['winner'] == 2) {
                        $('#LastFiveResult').append('<h6 style="color: red;">Pobedio je: ' + UserNick + '<h6>')
                    } else {
                        $('#LastFiveResult').append('<h6>Rezultat je: NERESENO<h6>')
                    }
                });
            });
    }

    AjaxGetResult();

    $(".cell").click(function () {

        if ($(this).text() == "" && play) {
            if ((move % 2) == 1) {
                //Dodavanje iksa u polje
                $(this).append("X");
                //Uzimanje id-a tog polja
                var id = $(this).attr('id');
                //Konvertovanje id-a u integer
                var converting_id = parseInt(id);
                if (WhoPlayFirst == 1) {
                    FirstPlayerCells.push(converting_id);
                } else {
                    SecoundPlayerCells.push(converting_id);
                }


                //Brisanje iz niza
                removeFromArray(EmptyFields, converting_id);

            }
            else {
                //Dodavanje OKS-a
                $(this).append("O");
                //Uzimanje id-a
                var id = $(this).attr('id')
                //Konvertovanje u integer
                var converting_id = parseInt(id);

                if (WhoPlayFirst == 1) {
                    SecoundPlayerCells.push(converting_id);
                } else {
                    FirstPlayerCells.push(converting_id);
                }


                //Brisanje iz niza
                removeFromArray(EmptyFields, converting_id);

            }
            if (checkForWinnerCombination() == true) {
                play = false;
                FirstPlayerCells = [];
                SecoundPlayerCells = [];
            }

            //Povecavanje poteza za 1
            move++;

        }
    });


    /**
     * Brisanje odrejenog clana niza
     */
    function removeFromArray(array, element) {
        var index = array.indexOf(element);
        array.splice(index, 1);
    }

    /**
     * Nasumicno vramaca nekog clana niza
     */
    function random_item(items) {
        return items[Math.floor(Math.random() * items.length)];
    }

    /**
     * Provera da li niz sadrzi odredjeni element
     */
    function arche(array, element) {
        if (array.indexOf(element) != -1) {
            return true;
        } else {
            return false;
        }
    }


    /**
     * Modal Show
     */
    function ModelShow(Winner) {
        if (Winner == 1) {
            var OldCookie = getCookie(1) + 1;
            setCookie(1, OldCookie, 30)
            $('#WinnerIsMultiPlayer').text('Pobednik je ' + SecoundNick + '(' + getCookie(1).length + ':' + getCookie(2).length + ')');
        } else if (Winner == 2) {
            //$('#WinnerIs').text('Pobednik je ' + UserNick);
            var OldCookie = getCookie(2) + 1;
            setCookie(2, OldCookie, 30)
            $('#WinnerIsMultiPlayer').text('Pobednik je ' + UserNick + '(' + getCookie(2).length + ':' + getCookie(1).length + ')');
        } else if (Winner == 0) {
            $('#WinnerIsMultiPlayer').text('NERESENO');
            var OldCookie = getCookie(0) + 1;
            setCookie(0, OldCookie, 30)
            // $('#WinnerIs').text('Pobednik je ' + UserNick + '(' + getCookie(2).length + ':' + getCookie(1).length + ')');
        }

        // $('#WinnerIs').text('Pobednik je '+Winner);
        if (WhoPlayFirst == 1) {
            setCookie('WhoPlayFirstNext', 2, 30)
        } else if (WhoPlayFirst == 2) {
            setCookie('WhoPlayFirstNext', 1, 30)
        }

        var FirstPlayerCellsString = FirstPlayerCells.toString();
        var SecoundPlayerCellsString = SecoundPlayerCells.toString();

        console.log(FirstPlayerCellsString);
        console.log(SecoundPlayerCellsString)

        $.ajax({
            method: "POST",
            url: "./api/addPlayersToDB",
            data: {
                first_player_nick: UserNick,
                secound_player_nick: SecoundNick,
                winner: Winner,
                time: Time,
                firstfields: FirstPlayerCellsString,
                secoundfields: SecoundPlayerCellsString,
                "_token": $('meta[name="csrf-token"]').attr('content'),
            }
        })
            .done(function (msg) {
                $('#MultiModWinnerModel').modal();
            });


        return false;
    }

    /**
     * Timer
     */
    function Timer() {
        setInterval(function () {
            Time += 1;
        }, 1000)
    }

    Timer();

    /**
     * Provera komnacija korisnika
     */
    function checkForWinnerCombination() {
        FirstToStr = String(FirstPlayerCells);
        SecoundToStr = String(SecoundPlayerCells);
        var CheckForEmpyTable = true;
        if (play == false) {
        } else {
            if (arche(FirstPlayerCells, 1) && arche(FirstPlayerCells, 2) && arche(FirstPlayerCells, 3)) {
                $('#1').css('background-color', 'green');
                $('#2').css('background-color', 'green');
                $('#3').css('background-color', 'green');
                CheckForEmpyTable = false;
                play = false;
                ModelShow(1)
                return true;

            } else if (arche(SecoundPlayerCells, 1) && arche(SecoundPlayerCells, 2) && arche(SecoundPlayerCells, 3)) {
                $('#1').css('background-color', 'green');
                $('#2').css('background-color', 'green');
                $('#3').css('background-color', 'green');
                CheckForEmpyTable = false;
                play = false;
                ModelShow(2)
                return true;

            }

            if (arche(FirstPlayerCells, 4) && arche(FirstPlayerCells, 5) && arche(FirstPlayerCells, 6)) {
                $('#4').css('background-color', 'green');
                $('#5').css('background-color', 'green');
                $('#6').css('background-color', 'green');
                CheckForEmpyTable = false;
                play = false;
                ModelShow(1)
                return true;
            } else if (arche(SecoundPlayerCells, 4) && arche(SecoundPlayerCells, 5) && arche(SecoundPlayerCells, 6)) {
                $('#4').css('background-color', 'green');
                $('#5').css('background-color', 'green');
                $('#6').css('background-color', 'green');
                CheckForEmpyTable = false;
                play = false;
                ModelShow(2)
                return true;
            }

            if (arche(FirstPlayerCells, 7) && arche(FirstPlayerCells, 8) && arche(FirstPlayerCells, 9)) {
                $('#7').css('background-color', 'green');
                $('#8').css('background-color', 'green');
                $('#9').css('background-color', 'green');
                CheckForEmpyTable = false;
                ModelShow(1)
                return true;
            } else if (arche(SecoundPlayerCells, 7) && arche(SecoundPlayerCells, 8) && arche(SecoundPlayerCells, 9)) {
                $('#7').css('background-color', 'green');
                $('#8').css('background-color', 'green');
                $('#9').css('background-color', 'green');
                CheckForEmpyTable = false;
                play = false;
                ModelShow(2)
                return true;
            }

            if (arche(FirstPlayerCells, 1) && arche(FirstPlayerCells, 4) && arche(FirstPlayerCells, 7)) {
                $('#1').css('background-color', 'green');
                $('#4').css('background-color', 'green');
                $('#7').css('background-color', 'green');
                CheckForEmpyTable = false;
                ModelShow(1)
                return true;
            } else if (arche(SecoundPlayerCells, 1) && arche(SecoundPlayerCells, 4) && arche(SecoundPlayerCells, 7)) {
                $('#1').css('background-color', 'green');
                $('#4').css('background-color', 'green');
                $('#7').css('background-color', 'green');
                CheckForEmpyTable = false;
                play = false;
                ModelShow(2);
                return true;
            }

            if (arche(FirstPlayerCells, 2) && arche(FirstPlayerCells, 5) && arche(FirstPlayerCells, 8)) {
                $('#2').css('background-color', 'green');
                $('#5').css('background-color', 'green');
                $('#8').css('background-color', 'green');
                CheckForEmpyTable = false;
                play = false;
                ModelShow(1);
                return true;
            } else if (arche(SecoundPlayerCells, 2) && arche(SecoundPlayerCells, 5) && arche(SecoundPlayerCells, 8)) {
                $('#2').css('background-color', 'green');
                $('#5').css('background-color', 'green');
                $('#8').css('background-color', 'green');
                CheckForEmpyTable = false;
                play = false;
                ModelShow(2);
                return true;
            }

            if (arche(FirstPlayerCells, 3) && arche(FirstPlayerCells, 6) && arche(FirstPlayerCells, 9)) {
                $('#3').css('background-color', 'green');
                $('#6').css('background-color', 'green');
                $('#9').css('background-color', 'green');
                CheckForEmpyTable = false;
                play = false;
                ModelShow(1)
                return true;
            } else if (arche(SecoundPlayerCells, 3) && arche(SecoundPlayerCells, 6) && arche(SecoundPlayerCells, 9)) {
                $('#3').css('background-color', 'green');
                $('#6').css('background-color', 'green');
                $('#9').css('background-color', 'green');
                CheckForEmpyTable = false;
                play = false;
                ModelShow(2)
                return true;
            }


            if (arche(FirstPlayerCells, 1) && arche(FirstPlayerCells, 5) && arche(FirstPlayerCells, 9)) {
                $('#1').css('background-color', 'green');
                $('#5').css('background-color', 'green');
                $('#9').css('background-color', 'green');
                CheckForEmpyTable = false;
                play = false;
                ModelShow(1)
                return true;
            } else if (arche(SecoundPlayerCells, 1) && arche(SecoundPlayerCells, 5) && arche(SecoundPlayerCells, 9)) {
                $('#1').css('background-color', 'green');
                $('#5').css('background-color', 'green');
                $('#9').css('background-color', 'green');
                CheckForEmpyTable = false;
                play = false;
                ModelShow(2)
                return true;
            }

            if (arche(FirstPlayerCells, 3) && arche(FirstPlayerCells, 5) && arche(FirstPlayerCells, 7)) {
                $('#3').css('background-color', 'green');
                $('#5').css('background-color', 'green');
                $('#7').css('background-color', 'green');
                CheckForEmpyTable = false;
                play = false;
                ModelShow(1)
                return true;
            } else if (arche(SecoundPlayerCells, 3) && arche(SecoundPlayerCells, 5) && arche(SecoundPlayerCells, 7)) {
                $('#3').css('background-color', 'green');
                $('#5').css('background-color', 'green');
                $('#7').css('background-color', 'green');
                CheckForEmpyTable = false;
                play = false;
                ModelShow(2)
                return true;
            }
            if (CheckForEmpyTable == true) {
                var firstPlusSecoundFields = EmptyFields.length;
                console.log(firstPlusSecoundFields);
                if (firstPlusSecoundFields == 0 && CheckForEmpyTable == true) {
                    play = false;
                    ModelShow(0)
                    return true;
                }
            }


        }
    }

}

$(document).ready(function () {
    function ClearTable() {
        $("#1").text('');
        $("#2").text('');
        $("#3").text('');
        $("#4").text('');
        $("#5").text('');
        $("#6").text('');
        $("#7").text('');
        $("#8").text('');
        $("#9").text('');

        $("#1").css('background-color', '#fff');
        $("#2").css('background-color', '#fff');
        $("#3").css('background-color', '#fff');
        $("#4").css('background-color', '#fff');
        $("#5").css('background-color', '#fff');
        $("#6").css('background-color', '#fff');
        $("#7").css('background-color', '#fff');
        $("#8").css('background-color', '#fff');
        $("#9").css('background-color', '#fff');
    }

    $('#FinishSinglePlayer').click(function () {
        ClearTable();
        var WhoNowPlayFirst = parseInt(getCookie('SinglePlayerWhoPlayNext'));
        SinglePlayer(WhoNowPlayFirst, getCookie('SinglePlayerNick'), true, 1)
        $('#SingleModWinnerModel').modal('hide');
    })

    $('#FirstModal').modal();
    $('#SinglePlayerButton').click(function () {
        $('#FirstModal').modal('hide');
        $('#SinglePlayerEnterNick').modal();
    })

    $('#SinglePlayerStartPlayButton').click(function () {
        var SinglePlayerNick = $('#SinglePlayerNick').val()
        SinglePlayer(0, SinglePlayerNick, true, 1)
        $('#SinglePlayerEnterNick').modal('hide');
        setCookie('SinglePlayerNick', SinglePlayerNick, 30)
        document.cookie = "1=";
        document.cookie = "2=";

    })

    /**
     * Ako je multi player selektovan
     */
    $('#MultiPlayerButton').click(function () {
        $('#FirstModal').modal('hide');
        $('#MultiPlayerEnterNick').modal();
    })

    /**
     * Multi Player Start Button
     */
    $('#MultiPlayerStartPlayButton').click(function () {
        document.cookie = "1=";
        document.cookie = "2=";
        MultiPlayer(0, $('#MultiPlayerNickFirst').val(), $('#MultiPlayerNickSecound').val(), true, 1);
        setCookie('MUserNick', $('#MultiPlayerNickFirst').val());
        setCookie('MUserNickSecound', $('#MultiPlayerNickSecound').val());
        $('#MultiPlayerEnterNick').modal('hide');
    })

    /**
     * Zavrsavanje Multi Player-a
     */
    $('#FinishMultiPlayer').click(function () {
        ClearTable();
        MultiPlayer(parseInt(getCookie('WhoPlayFirstNext')), getCookie('MUserNick'), getCookie('MUserNickSecound'), true, 1);
        $('#MultiModWinnerModel').modal('hide');
    })

})
