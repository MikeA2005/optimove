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
            'id' => $this->id,
            'worked_days' => $this->worked_days,
            'earned_salary' => $this->earned_salary,
            'transport_allowance' => $this->transport_allowance,
            'disability_value' => $this->disability_value,
            'overtime_value' => $this->overtime_value,
            'others_earnings' => $this->others_earnings,
            'total_earnings' => $this->total_earnings,
            'health_contribution' => $this->health_contribution,
            'pension_contribution' => $this->pension_contribution,
            'loan_payments' => $this->loan_payments,
            'funeral_plan' => $this->funeral_plan,
            'responsabilities' => $this->responsabilities,
            'payroll_deductions' => $this->payroll_deductions,
            'others_deductions' => $this->others_deductions,
            'total_deductions' => $this->total_deductions,
            'net_pay' => $this->net_pay,
            'employee' => new EmployeeResource($this->whenLoaded('employee')),
            'payroll_header_id' => $this->payroll_header_id,
        ];
    }
}
