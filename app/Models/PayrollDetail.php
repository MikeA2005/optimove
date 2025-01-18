<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class PayrollDetail extends Model
{
    use HasFactory;

    protected $guarded = ['id', 'created_at', 'updated_at'];

    // Constantes para valores fijos
    const HEALTH_PERCENTAGE = 0.04;
    const PENSION_PERCENTAGE = 0.04;
    const INDEPENDENT_DAYS_MONTH = 30;

    public static function boot()
    {
        parent::boot();

        static::creating(function ($payrollDetail) {
            $payrollDetail->calculatePayroll();
        });

        static::updating(function ($payrollDetail) {
            $payrollDetail->calculatePayroll();
        });
    }

    public function calculatePayroll()
    {
        // Eager loading de las relaciones necesarias
        $this->load(['employee.attendances', 'employee.disabilities', 'employee.overtimes.overtimeType', 'employee.loans']);

        if ($this->payrollHeader->payroll_type === "DEP") {
            $this->calculateDependentPayroll();
        } elseif ($this->payrollHeader->payroll_type === "IND") {
            $this->calculateIndependentPayroll();
        } else {
            $this->calculateWorkLaborPayroll();
        }
    }

    // Nómina para empleados dependientes
    public function calculateDependentPayroll()
    {
        // Calcular días laborados
        $this->worked_days = $this->calculateWorkedDays();
        // Calcular salario devengado
        $this->earned_salary = ($this->employee->base_salary / self::INDEPENDENT_DAYS_MONTH) * $this->worked_days;
        // Calcular auxilio de transporte
        $this->transport_allowance = ($this->employee->transport_allowance / self::INDEPENDENT_DAYS_MONTH) * $this->worked_days;
        // Calcular valor de incapacidad
        $this->disability_value = $this->calculateDisabilityValue();
        // Calcular valor de horas extras
        $this->overtime_value = $this->calculateOvertimeValue();
        // Calcular total de devengados
        $this->total_earnings = $this->earned_salary + $this->transport_allowance + $this->disability_value + $this->overtime_value + $this->others_earnings;

        // Calcular aportes a salud y pensión
        $this->health_contribution = ($this->total_earnings - $this->transport_allowance) * self::HEALTH_PERCENTAGE;
        $this->pension_contribution = ($this->total_earnings - $this->transport_allowance) * self::PENSION_PERCENTAGE;
        // Calcular pagos de préstamos
        $this->loan_payments = $this->calculateLoanPayments();
        // Calcular deducciones de nómina
        $this->payroll_deductions = 0;
        // Calcular total de deducciones
        $this->total_deductions = $this->health_contribution + $this->pension_contribution + $this->loan_payments + $this->funeral_plan + $this->responsabilities + $this->payroll_deductions + $this->others_deductions;

        // Calcular neto a pagar
        $this->net_pay = $this->total_earnings - $this->total_deductions;
    }

    private function calculateIndependentPayroll()
    {
        $this->worked_days = $this->calculateWorkedDays();
        $this->net_pay = ($this->employee->base_salary / self::INDEPENDENT_DAYS_MONTH) * $this->worked_days;
    }

    private function calculateWorkLaborPayroll()
    {
        $this->worked_days = $this->calculateWorkedDays();
        $this->net_pay = $this->employee->base_salary;
    }

    private function calculateWorkedDays()
    {
        return $this->employee->attendances
            ->whereBetween('date', [$this->payrollHeader->start_date, $this->payrollHeader->end_date])
            ->count();
    }

    private function calculateDisabilityValue()
    {
        $salary = $this->employee->base_salary;
        $total = 0;

        foreach ($this->employee->disabilities as $disability) {
            // Calcular la superposición entre la incapacidad y el período de nómina
            $overlapStart = Carbon::parse(max($disability->start_date, $this->payrollHeader->start_date));
            $overlapEnd = Carbon::parse(min($disability->end_date, $this->payrollHeader->end_date));
            $disabilityDays = $overlapStart->diffInDays($overlapEnd) + 1; // +1 para incluir el día de inicio

            for ($i = 1; $i <= $disabilityDays; $i++) {
                $dailySalary = $salary / self::INDEPENDENT_DAYS_MONTH;

                if ($i <= 2) {
                    // Los dos primeros días los paga el empleador al 100%
                    $total += $dailySalary;
                } elseif ($i > 2 && $i <= 90) {
                    // Del día 3 al 90, la EPS paga el 66.67% y el empleador el 33.33%
                    $total += $dailySalary * (33.33 / 100);
                } elseif ($i > 90) {
                    // Del día 91 en adelante, la EPS o el Fondo de Pensiones paga el 50% y el empleador el 50%
                    $total += $dailySalary * (50 / 100);
                }
            }
        }
        return $total;
    }

    private function calculateOvertimeValue()
    {
        $regularHour = $this->employee->base_salary / (config('app.constants.WEEKLY_HOURS') * 4);
        $total = 0;

        foreach ($this->employee->overtimes as $overtime) {
            $total += $this->calculateOvertimeForOvertime($overtime, $regularHour);
        }
        return $total;
    }

    private function calculateOvertimeForOvertime($overtime, $regularHour)
    {
        $overtimeType = $overtime->overtimeType;
        $overtimeValue = $regularHour * ($overtimeType->surcharge_percentage / 100);
        return $overtime->hours * $overtimeValue;
    }

    private function calculateLoanPayments()
    {
        $totalLoanDiscount = 0;

        foreach ($this->employee->loans as $loan) {
            if ($loan->pending_amount > 0) {
                $loanDiscount = $this->calculateLoanDiscount($loan);
                $totalLoanDiscount += $loanDiscount;
    
                // Actualizar el saldo del préstamo
                $loan->pending_amount -= $loanDiscount;
                $loan->save();
            }
        }

        return $totalLoanDiscount;
    }

    private function calculateLoanDiscount($loan)
    {
        return min($loan->installment_value, $loan->pending_amount);
    }

    public function payrollHeader()
    {
        return $this->belongsTo(PayrollHeader::class);
    }

    public function employee()
    {
        return $this->belongsTo(Employee::class);
    }
}
