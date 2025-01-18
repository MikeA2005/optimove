<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PayrollHeaderResource extends JsonResource
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
            'name' => $this->name,
            'start_date' => $this->start_date,
            'end_date' => $this->end_date,
            'payroll_type' => $this->payroll_type,
            'settlement_base'=> $this->settlement_base,
            'payroll_details' => PayrollDetailResource::collection($this->whenLoaded('payrollDetails')),
        ];
    }
}
