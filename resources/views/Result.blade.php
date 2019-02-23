<html>
<head>
    <title> Tic-Tac-Toe Result </title>
    @include('Parts.head-part')

</head>
<body>

<div class="container">
    <table class="table">
        <thead>
        <tr>
            <th>Prvi igrac</th>
            <th>Drugi igrac</th>
            <th>Pobedio je</th>
        </tr>
        </thead>
        <tbody>
        @foreach ($games as $game)
            <tr>
                <td>{{$game->first_player_nick}}</td>
                <td>{{$game->secound_player_nick}}</td>
                <td>{{$game->winner}}</td>
            </tr>
        @endforeach
        </tbody>
    </table>
    {!! $games->links() !!}
</div>


</body>
</html>