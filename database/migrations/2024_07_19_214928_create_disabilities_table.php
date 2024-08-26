<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('disabilities', function (Blueprint $table) {
            $table->id();

            // Disability information
            $table->date('start_date');
            $table->date('end_date')->nullable();
            $table->string('type', 50);
            $table->string('description', 255)->nullable();
            $table->decimal('daily_value', 10, 2);

            // Relationships
            $table->foreignId('employee_id')->constrained()->onDelete('cascade')->onUpdate('cascade');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('disabilities');
    }
};
