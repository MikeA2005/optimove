<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateLoanRequest extends FormRequest
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
            'date' => 'required|date|before_or_equal:today',
            'amount' => 'required|numeric|gt:0',
            'installments' => 'required|gt:0',
            'installment_value' => 'required|numeric|gt:0',
            'pending_amount' => 'required|numeric|gte:0',
            'employee_id' => 'required|exists:employees,id',
        ];
    }
}
