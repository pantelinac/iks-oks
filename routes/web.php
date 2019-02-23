<?php

/**
 * Prikazivanje stranica
 */
Route::get('/', function () {
    return view('Game');
});
Route::get('Result','Result@GetResult');