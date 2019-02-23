<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Users;
use App\Rounds;
class Result extends Controller
{
    public function GetResult(){
        $Table = Rounds::paginate(3);
        foreach ($Table as $Tab){
            $Tab->first_player_nick = $this->GetNick($Tab->first_player_id);
            $Tab->secound_player_nick = $this->GetNick($Tab->secound_player_id);
        }
        return view('Result',['games'=>$Table]);
    }

    public function GetNick($id){
        $UserNick = Users::where('id',$id)->pluck('nick')->first();
        dd($UserNick);
        return $UserNick;
    }
}
