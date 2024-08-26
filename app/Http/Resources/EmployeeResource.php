<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EmployeeResource extends JsonResource
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
            'first_name' => $this->first_name,
            'last_name' => $this->last_name,
            'document_type' => $this->document_type,
            'document_number' => $this->document_number,
            'birth_date' => $this->birth_date,
            'hire_date' => $this->hire_date,
            'base_salary' => $this->base_salary,
            'transport_allowance' => $this->transport_allowance,
            'contract_type' => $this->contract_type,
            'user' => new UserResource($this->whenLoaded('user')),
        ];
    }
}
