<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePayrollDetailRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'worked_days' => 'nullable|integer|min:0',
            'earned_salary' => 'nullable|numeric|min:0',
            'transport_allowance' => 'nullable|numeric|min:0',
            'disability_value' => 'nullable|numeric|min:0',
            'overtime_value' => 'nullable|numeric|min:0',
            'others_earnings' => 'nullable|numeric|min:0',
            'total_earnings' => 'nullable|numeric|min:0',
            'health_contribution' => 'nullable|numeric|min:0',
            'pension_contribution' => 'nullable|numeric|min:0',
            'loan_payments' => 'nullable|numeric|min:0',
            'funeral_plan' => 'nullable|numeric|min:0',
            'responsabilities' => 'nullable|numeric|min:0',
            'payroll_deductions' => 'nullable|numeric|min:0',
            'others_deductions' => 'nullable|numeric|min:0',
            'total_deductions' => 'nullable|numeric|min:0',
            'net_pay' => 'nullable|numeric|min:0',
            'employee_id' => 'required|exists:employees,id',
            'payroll_header_id' => 'required|exists:payroll_headers,id',
        ];
    }
}
