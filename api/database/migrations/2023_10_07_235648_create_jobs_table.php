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
            $table->foreignId('area_id')->constrained()->comment('地域ID');
            $table->foreignId('language_id')->constrained()->comment('言語ID');
            $table->foreignId('skill_id')->constrained()->comment('スキルID');
            $table->foreignId('enginner_type_id')->constrained()->comment('エンジニア種別ID');
            $table->foreignId('feature_id')->constrained()->comment('特徴ID');
            $table->string('title')->comment('タイトル');
            $table->integer('cost')->comment('単価');
            $table->string('description', 1000)->comment('案件の詳細');
            $table->json('required_skills')->comment('必要なスキル');
            $table->string('message')->comment('メッセージ');
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
