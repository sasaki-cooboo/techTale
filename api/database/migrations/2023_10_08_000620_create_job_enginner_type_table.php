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
        Schema::create('job_engineer_type', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('job_id')->comment('案件ID');
            $table->foreign('job_id')
                ->references('id')
                ->on('jobs');
            $table->unsignedBigInteger('engineer_type_id')->comment('エンジニア種別ID');
            $table->foreign('engineer_type_id')
                ->references('id')
                ->on('engineer_types');
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
        Schema::dropIfExists('job_engineer_type');
    }
};
