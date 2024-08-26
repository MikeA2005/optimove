<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePayrollHeaderRequest extends FormRequest
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
        // Asignar el valor de settlement_base a 0
        $this->merge(['settlement_base' => 0]);

        // Calcular el valor de settlement_base que resulta de la suma de todos los salarios de los empleados, que aparecen en payroll_details
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string',
            'start_date' => 'required|date',
            'end_date' => 'required|date',
            'settlement_base' => 'required|numeric',
        ];
    }
}
