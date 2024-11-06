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
        Schema::create('payrolls', function (Blueprint $table) {
            $table->id();

            // Payroll details
            $table->date('start_date');
            $table->date('end_date');
            
            // Employee details
            $table->integer('worked_days');
            $table->decimal('earned_salary', 10, 2);
            
            // Earnings
            $table->decimal('transport_allowance', 10, 2);
            $table->decimal('disability_value', 10, 2);
            $table->decimal('overtime_value', 10, 2);
            $table->decimal('others_earnings', 10, 2);
            $table->decimal('total_earnings', 10, 2);
            
            // Deductions
            $table->decimal('health_contribution', 10, 2);
            $table->decimal('pension_contribution', 10, 2);
            $table->decimal('loan_payments', 10, 2);
            $table->decimal('funeral_plan', 10, 2);
            $table->decimal('responsabilities', 10, 2);
            $table->decimal('payroll_deductions', 10, 2);
            $table->decimal('others_deductions', 10, 2);
            $table->decimal('total_deductions', 10, 2);
            
            // Net pay
            $table->decimal('net_pay', 10, 2);
            
            // Relationships
            $table->foreignId('employee_id')->constrained()->onDelete('cascade');
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payrolls');
    }
};
