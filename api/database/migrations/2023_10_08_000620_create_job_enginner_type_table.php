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
        Schema::create('job_enginner_type', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('job_id')->comment('案件ID');
            $table->unsignedBigInteger('enginner_type_id')->comment('エンジニア種別ID');
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
        Schema::dropIfExists('job_enginner_type');
    }
};
