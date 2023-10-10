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
        Schema::create('job_feature', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('job_id')->comment('案件ID');
            $table->unsignedBigInteger('feature_id')->comment('特徴ID');
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
        Schema::dropIfExists('job_feature');
    }
};
