<?php

use App\Http\Controllers\Api\JobController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('basicAuth')->prefix('v1')->group(
    function () {
        Route::get("/jobs", [JobController::class, "index"]);
        Route::get("/job/{id}", [JobController::class, "show"]);
        Route::get("/jobAttributes", [JobController::class, "getAttributes"]);
        Route::get("/jobBookmark", [JobController::class, "getBookmark"]);
        Route::post("/jobBookmark", [JobController::class, "setBookmark"]);
    }
);


// test
Route::middleware('basicAuth')->get("/test", function () {
    return response()->json(["test" => "hello2"]);
});
