<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePayrollRequest extends FormRequest
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
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date', 
            'worked_days' => 'required|integer|min:0',
            'earned_salary' => 'required|numeric|min:0',
            'transport_allowance' => 'nullable|numeric|min:0',
            'disability_value' => 'nullable|numeric|min:0',
            'overtime_value' => 'nullable|numeric|min:0',
            'others_earnings' => 'nullable|numeric|min:0',
            'total_earnings' => 'required|numeric|min:0',
            'health_contribution' => 'nullable|numeric|min:0',
            'pension_contribution' => 'nullable|numeric|min:0',
            'loan_payments' => 'nullable|numeric|min:0',
            'funeral_plan' => 'nullable|numeric|min:0',
            'responsabilities' => 'nullable|numeric|min:0',
            'payroll_deductions' => 'nullable|numeric|min:0',
            'others_deductions' => 'nullable|numeric|min:0',
            'total_deductions' => 'required|numeric|min:0',
            'net_pay' => 'required|numeric|min:0',
            'employee_id' => 'required|exists:employees,id',
        ];
    }
}