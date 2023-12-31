<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('job_area', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('job_id')->comment('案件ID');
            $table->foreign('job_id')
                ->references('id')
                ->on('jobs');
            $table->unsignedBigInteger('area_id')->comment('地域ID');
            $table->foreign('area_id')
                ->references('id')
                ->on('areas');
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
        Schema::dropIfExists('job_area');
    }
};
