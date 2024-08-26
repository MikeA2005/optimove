<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PayrollDetailResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'worked_days' => $this->worked_days,
            'earned_salary' => $this->earned_salary,
            'transport_allowance' => $this->transport_allowance,
            'disability_value' => $this->disability_value,
            'overtime_value' => $this->overtime_value,
            'other_earnings' => $this->other_earnings,
            'total_earnings' => $this->total_earnings,
            'health_contribution' => $this->health_contribution,
            'pension_contribution' => $this->pension_contribution,
            'arl_contribution' => $this->arl_contribution,
            'ccf_contribution' => $this->ccf_contribution,
            'income_tax' => $this->income_tax,
            'severance_payment' => $this->severance_payment,
            'loan_payment' => $this->loan_payment,
            'other_deductions' => $this->other_deductions,
            'total_deductions' => $this->total_deductions,
            'net_pay' => $this->net_pay,
            'payroll_header_id' => new PayrollHeaderResource($this->whenLoaded('payrollHeader')),
            'employee_id' => new EmployeeResource($this->whenLoaded('employee')),
        ];
    }
}
