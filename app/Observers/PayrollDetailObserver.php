<?php

namespace App\Observers;

use App\Models\PayrollDetail;

class PayrollDetailObserver
{
    public function creating(PayrollDetail $payrollDetail): void
    {
        // Detalles básicos
        $payrollDetail->worked_days = $payrollDetail->calculateWorkedDays($payrollDetail); // Calcular los días trabajados
        $payrollDetail->earned_salary = $payrollDetail->calculateEarnedSalary(); // Calcular el salario devengado

        // Devengados
        $payrollDetail->transport_allowance = $payrollDetail->employee->transport_allowance; // Llamar el auxilio de tranporte del empleado
        $payrollDetail->disability_value = $payrollDetail->getDisabilityValue(); // Calcular el valor de la incapacidad
        $payrollDetail->overtime_value = $payrollDetail->getOvertimeValue(); // Calcular el valor de las horas extras
        $payrollDetail->other_earnings = $payrollDetail->getOtherEarnings(); // Calcular otros devengados
        $payrollDetail->total_earnings = $payrollDetail->calculateTotalEarnings(); // Calcular el total de devengados

        // Deducciones
        $payrollDetail->health_contribution = $payrollDetail->getHealthContribution(); // Calcular la contribución a la salud
        $payrollDetail->pension_contribution = $payrollDetail->getPensionContribution(); // Calcular la contribución a la pensión
        $payrollDetail->arl_contribution = $payrollDetail->getArlContribution(); // Calcular la contribución a la ARL
        $payrollDetail->ccf_contribution = $payrollDetail->getCcfContribution(); // Calcular la contribución a la CCF
        $payrollDetail->severance_payment = $payrollDetail->getSeverancePayment(); // Calcular la prima de servicios
        $payrollDetail->loan_payment = $payrollDetail->getLoanPayment(); // Calcular el pago de préstamos
        $payrollDetail->other_deductions = $payrollDetail->getOtherDeductions(); // Calcular otras deducciones
        $payrollDetail->total_deductions = $payrollDetail->calculateTotalDeductions(); // Calcular el total de deducciones

        // Neto a pagar
        $payrollDetail->net_pay = $payrollDetail->calculateNetPay(); // Calcular el neto a pagar
    }

    private function calculateWorkedDays(PayrollDetail $payrollDetail): int
    {
        $attendances = $payrollDetail->employee->attendances()
            ->whereBetween('date', [$payrollDetail->payrollHeader->start_date, $payrollDetail->payrollHeader->end_date])
            ->get();
        
        return $attendances->count();
    }

    private function calculateEarnedSalary(PayrollDetail $payrollDetail)
    {
        $base_salary = $payrollDetail->employee->base_salary;
        $worked_days = $payrollDetail->worked_days;

        $earned_salary = ($base_salary/30) * $worked_days;

        return $earned_salary;
    }

    private function getDisabilityValue(PayrollDetail $payrollDetail)
    {

    }

    private function getOvertimeValue(PayrollDetail $payrollDetail)
    {

    }

}
