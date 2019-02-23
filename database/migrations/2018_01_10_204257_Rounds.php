<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Rounds extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::create('rounds', function (Blueprint $table) {
            $table->increments('id');
            $table->bigInteger('first_player_id');
            $table->bigInteger('secound_player_id');
            $table->integer('winner');
            $table->string('browserandos');
            $table->string('ip');
            $table->string('time');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
        Schema::dropIfExists('rounds');
    }
}
