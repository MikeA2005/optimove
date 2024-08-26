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
        Schema::create('employees', function (Blueprint $table) {
            $table->id();

            // Personal information
            $table->string('first_name', 255);
            $table->string('last_name', 255);
            $table->string('document_type', 50);
            $table->string('document_number', 50)->unique()->index();
            $table->date('birth_date');
            $table->date('hire_date');

            // Employment information
            $table->decimal('base_salary', 11, 2);
            $table->decimal('transport_allowance', 10, 2);
            $table->string('contract_type', 50);

            // Relationships
            $table->foreignId('user_id')->nullable()->constrained()->onDelete('cascade')->onUpdate('cascade');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('employees');
    }
};
