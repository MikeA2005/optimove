<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateAttendanceRequest extends FormRequest
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
                'required',
                'integer',
                'exists:employees,id',
                Rule::unique('attendances')->ignore($this->attendance, 'id')->where(function ($query) { // <-- Change here
                    return $query->where('employee_id', $this->employee_id)
                        ->whereDate('date', $this->date);
                }),
            ],
            'client_id' => 'required|integer|exists:clients,id',
            'city_id' => 'required|integer|exists:cities,id',
            'date' => 'required|date',
            'daily_value' => 'required|numeric|min:0',
        ];
    }
}
