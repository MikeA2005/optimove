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
        return $this->user()->can('create', \App\Models\Employee::class);
    }

    protected function prepareForValidation(): void
    {
        // Obtener el salario mínimo y el doble del salario mínimo
        $MinimumWage = config('app.constants.SMMLV');
        $twoSMMLV = $MinimumWage * 2;

        // Obtener el salario base del request
        $baseSalary = $this->input('base_salary');

        // Obtener el tipo de contrato del request
        $contractType = $this->input('contract_type');

        if ($contractType === "IND") {
            // Si el contrato es independiente, se asigna 0 al salario base
            $this->merge(['base_salary' => 0]);
            $this->merge(['transport_allowance' => 0]);
        } else {
            // Si el contrato es dependiente, se asigna el salario base introducido o el valor predeterminado
            $this->merge(['base_salary' => $baseSalary]);

            // Se verifica si el salario base es mayor a dos salarios mínimos
            if ($baseSalary > $twoSMMLV) {
                $this->merge(['transport_allowance' => 0]);
            } else {
                $this->merge(['transport_allowance' => config('app.constants.TRANSPORT_ALLOWANCE')]);
            }
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
            'base_salary' => ['nullable', 'numeric', 'min:0'],
            'transport_allowance' => ['required', 'numeric', 'min:0'],
            'contract_type' => ['required', 'string', 'max:50'],
            'user_id' => ['nullable', 'exists:users,id'],
        ];
    }
}
