<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('legal_sections', function (Blueprint $table) {
            $table->id();
            $table->string('page'); // 'legal' or 'privacy'
            $table->string('title');
            $table->text('content');
            $table->unsignedInteger('order')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('legal_sections');
    }
};
