<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class VacationResource extends JsonResource
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
            'year' => $this->year,
            'available_days' => $this->available_days,
            'used_days' => $this->used_days,
            'employee' => new EmployeeResource($this->whenLoaded('employee')),
        ];
    }
}
