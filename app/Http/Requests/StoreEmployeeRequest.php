<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreEmployeeRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    protected function prepareForValidation(): void
    {
        // Obtener el salario mínimo y el doble del salario mínimo
        $MinimumWage = config('app.constants.SMMLV');
        $twoSMMLV = $MinimumWage * 2;

        // Obtener el salario base del request
        $baseSalary = $this->input('base_salary');

        // Si el salario base es mayor a dos salarios mínimos, la asignación de transporte es 0
        if ($baseSalary > $twoSMMLV) {
            $this->merge(['transport_allowance' => 0]);
        } else {
            $this->merge(['transport_allowance' => config('app.constants.TRANSPORT_ALLOWANCE')]);
        }
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'first_name' => ['required', 'string', 'max:255'],
            'last_name' => ['required', 'string', 'max:255'],
            'document_type' => ['required', 'string', 'max:50'],
            'document_number' => ['required', 'string', 'max:50', Rule::unique('employees')],
            'birth_date' => ['required', 'date', 'before:hire_date'],
            'hire_date' => ['required', 'date', 'before_or_equal:today'],
            'base_salary' => ['required', 'numeric', 'min:0'],
            'transport_allowance' => ['required', 'numeric', 'min:0'],
            'contract_type' => ['required', 'string', 'max:50'],
            'user_id' => ['nullable', 'exists:users,id'],
        ];
    }
}
