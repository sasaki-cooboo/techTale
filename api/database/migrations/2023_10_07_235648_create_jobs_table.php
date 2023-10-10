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
        Schema::create('jobs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('area_id')->constrained();
            $table->foreignId('language_id')->constrained();
            $table->foreignId('skill_id')->constrained();
            $table->foreignId('enginner_type_id')->constrained();
            $table->foreignId('feature_id')->constrained();
            $table->string('title');
            $table->integer('cost');
            $table->string('description', 1000);
            $table->json('required_skills');
            $table->string('message');
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
        Schema::dropIfExists('jobs');
    }
};
