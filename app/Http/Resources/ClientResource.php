<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ClientResource extends JsonResource
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
            'company_name' => $this->company_name,
            'nit' => $this->nit,

            // Option 1: Eager Load and Transform Cities (Recommended)
            'cities' => $this->whenLoaded('cities', function () {
                return CityResource::collection($this->cities);
            }),

            // Additional fields as needed
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}