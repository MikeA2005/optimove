<?php

namespace App\Observers;

use App\Models\PayrollDetail;

class PayrollDetailObserver
{
    public function creating(PayrollDetail $payrollDetail): void
    {
        // Detalles básicos
        $payrollDetail->worked_days = $this->calculateWorkedDays($payrollDetail); // Calcular los días trabajados
        $payrollDetail->earned_salary = $this->calculateEarnedSalary($payrollDetail); // Calcular el salario devengado

        // Devengados
        $payrollDetail->transport_allowance = $payrollDetail->employee->transport_allowance; // Llamar el auxilio de transporte del empleado
        $payrollDetail->disability_value = $this->getDisabilityValue($payrollDetail); // Calcular el valor de la incapacidad
        $payrollDetail->overtime_value = $this->getOvertimeValue($payrollDetail); // Calcular el valor de las horas extras
        $payrollDetail->total_earnings = $this->calculateTotalEarnings($payrollDetail); // Calcular el total de devengados

        // Deducciones
        $payrollDetail->health_contribution = $this->getHealthContribution($payrollDetail); // Calcular la contribución a la salud
        $payrollDetail->pension_contribution = $this->getPensionContribution($payrollDetail); // Calcular la contribución a la pensión
        $payrollDetail->arl_contribution = $this->getArlContribution($payrollDetail); // Calcular la contribución a la ARL
        $payrollDetail->ccf_contribution = $this->getCcfContribution($payrollDetail); // Calcular la contribución a la CCF
        $payrollDetail->severance_payment = $this->getSeverancePayment($payrollDetail); // Calcular la prima de servicios
        $payrollDetail->loan_payment = $this->getLoanPayment($payrollDetail); // Calcular el pago de préstamos
        $payrollDetail->total_deductions = $this->calculateTotalDeductions($payrollDetail); // Calcular el total de deducciones

        // Neto a pagar
        $payrollDetail->net_pay = $this->calculateNetPay($payrollDetail); // Calcular el neto a pagar
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
        $worked_days = $this->calculateWorkedDays($payrollDetail); // Llamar a la función para calcular los días trabajados

        $earned_salary = ($base_salary / 30) * $worked_days;

        return $earned_salary;
    }

    private function getDisabilityValue(PayrollDetail $payrollDetail)
    {
        $disabilities = $payrollDetail->employee->disabilities()
            ->whereBetween('start_date', [$payrollDetail->payrollHeader->start_date, $payrollDetail->payrollHeader->end_date])
            ->orWhereBetween('end_date', [$payrollDetail->payrollHeader->start_date, $payrollDetail->payrollHeader->end_date])
            ->get();

        $disabilityValue = 0;
        foreach ($disabilities as $disability) {
            // Calcular la cantidad de días de incapacidad dentro del período de nómina
            $overlapDays = $this->calculateOverlapDays(
                $payrollDetail->payrollHeader->start_date,
                $payrollDetail->payrollHeader->end_date,
                $disability->start_date,
                $disability->end_date
            );

            // Calcular el valor de la incapacidad para esos días
            $disabilityValue += ($payrollDetail->employee->base_salary / 30) * $overlapDays * ($disability->percentage / 100);
        }

        return $disabilityValue;
    }


    private function getOvertimeValue(PayrollDetail $payrollDetail)
    {
        $overtimes = $payrollDetail->employee->overtimes()
            ->whereBetween('date', [$payrollDetail->payrollHeader->start_date, $payrollDetail->payrollHeader->end_date])
            ->get();

        $overtimeValue = 0;
        foreach ($overtimes as $overtime) {
            $overtimeValue += $overtime->hours * $overtime->overtimeType->value;
        }

        return $overtimeValue;
    }

    private function calculateTotalEarnings(PayrollDetail $payrollDetail)
    {
        return $payrollDetail->earned_salary +
            $payrollDetail->transport_allowance +
            $payrollDetail->disability_value +
            $payrollDetail->overtime_value +
            $payrollDetail->other_earnings;
    }

    private function getHealthContribution(PayrollDetail $payrollDetail)
    {
        // Aquí puedes agregar la lógica para calcular la contribución a la salud
        // ...
        return 0; // Reemplaza con el valor calculado
    }

    private function getPensionContribution(PayrollDetail $payrollDetail)
    {
        // Aquí puedes agregar la lógica para calcular la contribución a la pensión
        // ...
        return 0; // Reemplaza con el valor calculado
    }

    private function getArlContribution(PayrollDetail $payrollDetail)
    {
        // Aquí puedes agregar la lógica para calcular la contribución a la ARL
        // ...
        return 0; // Reemplaza con el valor calculado
    }

    private function getCcfContribution(PayrollDetail $payrollDetail)
    {
        // Aquí puedes agregar la lógica para calcular la contribución a la CCF
        // ...
        return 0; // Reemplaza con el valor calculado
    }

    private function getSeverancePayment(PayrollDetail $payrollDetail)
    {
        // Aquí puedes agregar la lógica para calcular la prima de servicios
        // ...
        return 0; // Reemplaza con el valor calculado
    }

    private function getLoanPayment(PayrollDetail $payrollDetail)
    {
        // Aquí puedes agregar la lógica para calcular el pago de préstamos
        // ...
        return 0; // Reemplaza con el valor calculado
    }

    private function calculateTotalDeductions(PayrollDetail $payrollDetail)
    {
        return $payrollDetail->health_contribution +
            $payrollDetail->pension_contribution +
            $payrollDetail->arl_contribution +
            $payrollDetail->ccf_contribution +
            $payrollDetail->severance_payment +
            $payrollDetail->loan_payment +
            $payrollDetail->other_deductions;
    }

    private function calculateNetPay(PayrollDetail $payrollDetail)
    {
        return $payrollDetail->total_earnings - $payrollDetail->total_deductions;
    }

    // Función auxiliar para calcular la cantidad de días de traslape entre dos rangos de fechas
    private function calculateOverlapDays($startDate1, $endDate1, $startDate2, $endDate2)
    {
        $start = max($startDate1, $startDate2);
        $end = min($endDate1, $endDate2);

        if ($start > $end) {
            return 0;
        }

        return (strtotime($end) - strtotime($start)) / 86400 + 1;
    }
}
