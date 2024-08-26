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
        Schema::create('payroll_details', function (Blueprint $table) {
            $table->id();

            // Payroll information
            $table->integer('worked_days');
            $table->decimal('earned_salary', 11, 2);
            $table->decimal('transport_allowance', 10, 2);

            // Earnings
            $table->decimal('disability_value', 10, 2);
            $table->decimal('overtime_value', 10, 2);
            $table->decimal('other_earnings', 10, 2);
            $table->decimal('total_earnings', 11, 2);

            // Deductions
            $table->decimal('health_contribution', 10, 2);
            $table->decimal('pension_contribution', 10, 2);
            $table->decimal('arl_contribution', 10, 2);
            $table->decimal('ccf_contribution', 10, 2);
            $table->decimal('loan_payment', 10, 2);
            $table->decimal('funeral_plan', 10, 2);
            $table->decimal('responsabilities', 10, 2);
            $table->decimal('other_deductions', 10, 2);
            $table->decimal('total_deductions', 11, 2);

            // Net salary
            $table->decimal('net_pay', 11, 2);

            // Relationship
            $table->foreignId('payroll_header_id')->constrained()->onDelete('cascade')->onUpdate('cascade');
            $table->foreignId('employee_id')->constrained()->onDelete('cascade')->onUpdate('cascade');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payroll_details');
    }
};
