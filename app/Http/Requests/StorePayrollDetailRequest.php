<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StorePayrollDetailRequest extends FormRequest
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
            'worked_days' => ['required', 'numeric', 'min:0'],
            'earned_salary' => ['required', 'numeric', 'min:0'],
            'transport_allowance' => ['required', 'numeric', 'min:0'],
            'disability_value' => ['required', 'numeric', 'min:0'],
            'overtime_value' => ['required', 'numeric', 'min:0'],
            'other_earnings' => ['required', 'numeric', 'min:0'],
            'total_earnings' => ['required', 'numeric', 'min:0'],
            'health_contribution' => ['required', 'numeric', 'min:0'],
            'pension_contribution' => ['required', 'numeric', 'min:0'],
            'arl_contribution' => ['required', 'numeric', 'min:0'],
            'ccf_contribution' => ['required', 'numeric', 'min:0'],
            'income_tax' => ['required', 'numeric', 'min:0'],
            'severance_payment' => ['required', 'numeric', 'min:0'],
            'loan_payment' => ['required', 'numeric', 'min:0'],
            'other_deductions' => ['required', 'numeric', 'min:0'],
            'total_deductions' => ['required', 'numeric', 'min:0'],
            'net_pay' => ['required', 'numeric', 'min:0'],
            'payroll_header_id' => [
                'required',
                Rule::exists('payroll_headers', 'id')->whereNull('deleted_at')
            ],
            'employee_id' => [
                'required',
                Rule::exists('employees', 'id')->whereNull('deleted_at')
            ],
        ];
    }
}
