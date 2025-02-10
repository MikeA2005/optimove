<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AttendanceResource extends JsonResource
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
            'date' => $this->date,
            'employee_id' => $this->employee_id,
            'employee' => new EmployeeResource($this->whenLoaded('employee')),
            'client' => new ClientResource($this->whenLoaded('client')),
            'city' => new CityResource($this->whenLoaded('city')),
            'shift_type' => new ShiftTypeResource($this->whenLoaded('shiftType')),
            'task' => new TaskResource($this->whenLoaded('task')),
        ];
    }
}
