<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreAttendanceRequest extends FormRequest
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
            'employee_id' => [
                'required', 'integer', 'exists:employees,id',
                Rule::unique('attendances')->where(function ($query) {
                    return $query->where('employee_id', $this->employee_id)
                        ->whereDate('date', $this->date);
                }),
            ],
            'client_id' => 'required|integer|exists:clients,id',
            'city_id' => 'required|integer|exists:cities,id',
            'shift_type_id' => 'nullable|integer|exists:shift_types,id',
            'task_id' => 'nullable|integer|exists:tasks,id',
            'date' => 'required|date|date_equals:today',
        ];
    }
}
