<?php

namespace App\Http\Controllers;

use App\Rounds;
use Illuminate\Http\Request;
use App\Users;
use App\PlayerFields;
use Illuminate\Support\Facades\Session;
use Carbon\Carbon;
class Players extends Controller
{
    private $FirstUserId;
    private $SecoundUserId;
    public function addPlayersToDB(Request $request)
    {
        //Provera za prvog usera
        if($this->CheckIfUserExist($request->first_player_nick)){
            if(empty(Session::get('FirstUserId'))){
                Session::put('firstUserId',$this->getUserId($request->first_player_nick));
                $this->FirstUserId = $this->getUserId($request->first_player_nick);
            }else{
                $this->FirstUserId = Session::get('FirstUserId');
            }
        }else{
            $FirstUser = new Users();
            $FirstUser->nick = $request->first_player_nick;
            $FirstUser->save();
            $this->FirstUserId = $FirstUser->id;
            Session::put('firstUserId',$FirstUser->id);
        }

        if($this->CheckIfUserExist($request->secound_player_nick)){
            if(empty(Session::get('SecoundUserId'))){
                Session::put('SecoundUserId', $this->getUserId($request->secound_player_nick));
                $this->SecoundUserId = $this->getUserId($request->secound_player_nick);
            }else{
                $this->SecoundUserId = Session::get('SecoundUserId');
            }
        }else{
            $SecoundUser = new Users();
            $SecoundUser->nick = $request->secound_player_nick;
            $SecoundUser->save();
            $this->SecoundUserId = $SecoundUser->id;
            Session::put('SecoundUserId', $SecoundUser->id);
        }

        $Players = new Rounds();
        $Players->first_player_id = $this->FirstUserId;
        $Players->secound_player_id = $this->SecoundUserId;
        $Players->winner = $request->winner;
        $Players->browserandos = $request->header('user-agent');
        $Players->ip = $request->ip();
        $Players->time = $request->time;
        $Players->created_at = Carbon::now();
        $Players->updated_at = Carbon::now();
        $Players->save();


        $PlayerFields = new PlayerFields();
        $PlayerFields->players_table_id = $Players->id;
        $PlayerFields->firstfields = $request->firstfields;
        $PlayerFields->secoundfields = $request->secoundfields;
        $PlayerFields->created_at = Carbon::now();
        $PlayerFields->updated_at = Carbon::now();
        $PlayerFields->save();
    }

    public function GetLastFiveResoult(Request $request){
        $getLastFiveResult = Rounds::where('first_player_id',$this->getUserId($request->first_player_nick))->where('secound_player_id',$this->getUserId($request->secound_player_nick))->select('winner')->orderBy('id', 'desc')->take(5)->get();
        return $getLastFiveResult->toJson();
    }

    /**
     * Provera da li korisnik postoji
     * @param $nick
     * @return bool
     */
    protected function CheckIfUserExist($nick){
        $CountUser = Users::where('nick',$nick)->count();
        if($CountUser > 0){
            return true;
        }else{
            return false;
        }
    }

    protected function getUserId($nick){
        $UserId = Users::where('nick',$nick)->pluck('id')->first();
        return $UserId;
    }
}
