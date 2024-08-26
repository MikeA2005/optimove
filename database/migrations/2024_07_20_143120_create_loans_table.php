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
        Schema::create('loans', function (Blueprint $table) {
            $table->id();

            // Loan information
            $table->date('date');
            $table->decimal('amount', 10, 2);
            $table->integer('installments');
            $table->decimal('installment_value', 10, 2);
            $table->decimal('pending_amount', 10, 2);

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
        Schema::dropIfExists('loans');
    }
};
