<html>
<head>
    <title>Tic tac toe</title>
    @include('Parts.head-part')
</head>
<body>
<div class="col-sm-12 col-md-8 col-lg-8" style="padding: 0px; margin: 0px;">
    <table id='board'>
        <tr>
            <td class="cell" id="1"></td>
            <td class="cell" id="2"></td>
            <td class="cell" id="3"></td>
        </tr>
        <tr>
            <td class="cell" id="4"></td>
            <td class="cell" id="5"></td>
            <td class="cell" id="6"></td>
        </tr>
        <tr>
            <td class="cell" id="7"></td>
            <td class="cell" id="8"></td>
            <td class="cell" id="9"></td>
        </tr>
    </table>
</div>
<div class="col-md-4 col-lg-4 hidden-sm hidden-xs" style="text-align: center;">
    <hr>
    <h3 style="text-align: center;" id="whoPlayFirst"></h3>
    <hr>
    <h4>REZULTATI POSLEDJIH 5 PARTIJA</h4>
    <div id="LastFiveResult">

    </div>
    <a href="./Result"> <button type="button" class="btn btn-primary btn-block">Pogledajte svih listu rezultata</button></a>

</div>
<!-- FirstModal -->
<div class="modal fade" id="FirstModal" role="dialog" data-backdrop="static" data-keyboard="false">
    <div class="modal-dialog">
        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Dobrodosli na IKS-OKS</h4>
                <p class="modal-title">Izaberite da li zelite da igrate protiv racunara ili imate saigrača ...</p>
            </div>
            <div class="modal-body">
                <img class="FullWidth"
                     src="{{ URL::asset('assets/images/red-tic-tac-toe.png') }}"
                     alt="">
                <div class="row">
                    <p id="WhoPlayFirst" style="display: none;"></p>
                    <div class="col-sm-12 col-md-12 col-lg-12" id="SinglePlayerButton" style="padding-bottom: 10px;">
                        <button type="button" class="btn btn-primary btn-block">Jedan igrac</button>
                    </div>
                    <div class="col-sm-12 col-md-12 col-lg-12" id="MultiPlayerButton">
                        <button type="button" class="btn btn-primary btn-block">Dva igraca</button>
                    </div>
                </div>
            </div>
        </div>

    </div>
</div>

<!-- Single Player Enter Nick -->
<div class="modal fade" id="SinglePlayerEnterNick" role="dialog" data-backdrop="static" data-keyboard="false">
    <div class="modal-dialog">
        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Dobrodosli na IKS-OKS</h4>
                <p class="modal-title">Unesite svoj nadimak i igra moze poceti, budite kreativni...</p>
            </div>
            <div class="modal-body">
                <img class="FullWidth"
                     src="{{ URL::asset('assets/images/red-tic-tac-toe.png') }}"
                     alt="">
                <div class="row">
                    <div class="col-sm-12 col-md-12 col-lg-12">
                        <div class="col-sm-6 col-md-6 col-lg-6">
                            <input type="text" class="form-control" id="SinglePlayerNick" placeholder="Unesite nadimak">
                        </div>
                        <div class="col-sm-6 col-md-6 col-lg-6">
                            <div class="col-sm-12 col-md-12 col-lg-12" id="SinglePlayerStartPlayButton">
                                <button type="button" class="btn btn-primary btn-block">Zapocni igru</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</div>

<!-- Multi Player Enter Nick -->
<div class="modal fade" id="MultiPlayerEnterNick" role="dialog" data-backdrop="static" data-keyboard="false">
    <div class="modal-dialog">
        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Dobrodosli na IKS-OKS</h4>
                <p class="modal-title">Unesite svoj nadimak i igra moze poceti, budite kreativni...</p>
            </div>
            <div class="modal-body">
                <img class="FullWidth"
                     src="{{ URL::asset('assets/images/red-tic-tac-toe.png') }}"
                     alt="">
                <div class="row">
                    <div class="col-sm-12 col-md-12 col-lg-12">
                        <div class="col-sm-6 col-md-6 col-lg-6">
                            <input type="text" class="form-control" id="MultiPlayerNickFirst"
                                   placeholder="Unesite nadimak (Igrac 1)">
                        </div>
                        <div class="col-sm-6 col-md-6 col-lg-6">
                            <input type="text" class="form-control" id="MultiPlayerNickSecound"
                                   placeholder="Unesite nadimak (Igrac 2)">
                        </div>
                        <div class="col-sm-12 col-md-12 col-lg-12" id="MultiPlayerStartPlayButton">
                            <button type="button" class="btn btn-primary btn-block">Zapocni igru</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</div>

<!-- Modal -->
<div class="modal fade" id="SingleModWinnerModel" role="dialog" data-backdrop="static" data-keyboard="false">
    <div class="modal-dialog">
        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Dobrodosli na IKS-OKS</h4>
            </div>
            <div class="modal-body">
                <img class="FullWidth" src="{{ URL::asset('assets/images/fireworks-animation-gif.gif') }}"
                     alt="">
                <div class="row">
                    <h2 id="WinnerIs" style="text-align: center;"></h2>
                </div>
                <div class="row">
                    <p id="WhoPlayFirst" style="display: none;"></p>
                    <div class="col-sm-12 col-md-12 col-lg-12" id="FinishSinglePlayer">
                        <button type="button" class="btn btn-primary btn-block">Igraj Ponovo</button>
                    </div>
                </div>
            </div>
        </div>

    </div>
</div>

<!-- Modal -->
<div class="modal fade" id="MultiModWinnerModel" role="dialog" data-backdrop="static" data-keyboard="false">
    <div class="modal-dialog">
        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Dobro dosli na IKS-OKS</h4>
            </div>
            <div class="modal-body">
                <img class="FullWidth" src="{{ URL::asset('assets/images/fireworks-animation-gif.gif') }}"
                     alt="">
                <div class="row">
                    <h2 id="WinnerIsMultiPlayer" style="text-align: center;"></h2>
                </div>
                <div class="row">
                    <p id="WhoPlayFirstMulti" style="display: none;"></p>
                    <div class="col-sm-12 col-md-12 col-lg-12" id="FinishMultiPlayer">
                        <button type="button" class="btn btn-primary btn-block">Igraj Ponovo</button>
                    </div>
                </div>
            </div>
        </div>

    </div>
</div>
</body>
</html>