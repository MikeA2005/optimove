<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payroll extends Model
{
    use HasFactory;

    protected $guarded = ['id', 'created_at', 'updated_at'];

    public static function boot()
    {
        parent::boot();

        static::creating(function ($payroll) {
            // Asignar valores predeterminados antes de crear el registro
            $payroll->worked_days = $payroll->calculateWorkedDays();
            $payroll->earned_salary = $payroll->employee->base_salary / 30 * $payroll->worked_days;

            // Devengados
            $payroll->transport_allowance = $payroll->employee->transport_allowance / 30 * $payroll->worked_days;
            $payroll->disability_value = $payroll->calculateDisabilityValue();
            $payroll->overtime_value = $payroll->calculateOvertimeValue();
            $payroll->total_earnings = $payroll->earned_salary + $payroll->transport_allowance + $payroll->disability_value + $payroll->overtime_value + $payroll->others_earnings;

            // Deducidos
            $payroll->health_contribution = ($payroll->total_earnings - $payroll->transport_allowance) * 0.04;
            $payroll->pension_contribution = ($payroll->total_earnings - $payroll->transport_allowance) * 0.04;
            $payroll->loan_payments = $payroll->calculateLoanPayments();
            $payroll->payroll_deductions = $payroll->calculatePayrollDeductions();
            $payroll->total_deductions = $payroll->health_contribution + $payroll->pension_contribution + $payroll->loan_payments + $payroll->funeral_plan + $payroll->responsabilities + $payroll->payroll_deductions + $payroll->others_deductions;

            // Neto a pagar
            $payroll->net_pay = $payroll->total_earnings - $payroll->total_deductions;
        });
    }

    private function calculateWorkedDays()
    {
        // Falta contar los fines de semana y los festivos, siempre y cuando el empleado no sea trabajador independiente
        $attendances = $this->employee->attendances()->whereBetween('date', [$this->start_date, $this->end_date])->get();
        $workedDays = $attendances->count();

        return $workedDays;
    }

    private function calculateDisabilityValue()
    {
        // $disabilities = $this->employee->disabilities()->whereBetween('date', [$this->start_date, $this->end_date])->get();
        // $disabilityDays = $disabilities->count();

        // $salary = $this->employee->base_salary;
        // $dailySalary = $salary / 30;
        // $total = 0;

        // for ($i = 1; $i <= $disabilityDays; $i++) {
        //     if ($i <= 2) {
        //         $dailyValue = $dailySalary;
        //     } elseif ($i <= 90) {
        //         $dailyValue = $dailySalary * 0.3334;
        //         $dailyValue = min($dailyValue, $dailySalary);
        //     } else {
        //         $dailyValue = $dailySalary * 0.5;
        //     }

        //     // Adjust transport allowance deduction as needed
        //     $dailyValue -= min($this->employee->transport_allowance / 30, $dailyValue);

        //     $total += $dailyValue;
        // }

        // return $total;
        return 0;
    }

    private function calculateOvertimeValue()
    {
        $overtimes = $this->employee->overtimes()->whereBetween('date', [$this->start_date, $this->end_date])->get();
        $regularHour = $this->employee->base_salary / (config('app.constants.WEEKLY_HOURS') * 4);
        $total = 0;

        foreach ($overtimes as $overtime) {
            $overtimeTypes = $overtime->overtimeType;
            $overtimeValue = $regularHour * ($overtimeTypes->surcharge_percentage / 100);
            $overtimeTotalValue = $overtimeValue * $overtime->hours;

            $total += $overtimeTotalValue;
        }
        return $total;
    }

    private function calculateLoanPayments()
    {
        // Manejar bien esto
        return 0;
    }

    private function calculatePayrollDeductions()
    {
        // Manejar bien esto
        return 0;
    }

    public function employee()
    {
        return $this->belongsTo(Employee::class);
    }
}
