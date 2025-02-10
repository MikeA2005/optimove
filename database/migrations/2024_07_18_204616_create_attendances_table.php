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
        Schema::create('attendances', function (Blueprint $table) {
            $table->id();

            // Attendance information
            $table->date('date');

            // Relationships
            $table->foreignId('employee_id')->constrained()->onDelete('cascade')->onUpdate('cascade');
            $table->foreignId('client_id')->constrained()->onDelete('cascade')->onUpdate('cascade');
            $table->foreignId('city_id')->constrained()->onDelete('cascade')->onUpdate('cascade');
            $table->foreignId('shift_type_id')->nullable()->constrained()->onDelete('cascade')->onUpdate('cascade');
            $table->foreignId('task_id')->nullable()->constrained()->onDelete('cascade')->onUpdate('cascade');

            $table->timestamps();

            // Unique constraint to avoid duplicate attendances for the same employee on the same day (date)
            $table->unique(['employee_id', 'date']);
            
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('attendances');
    }
};
