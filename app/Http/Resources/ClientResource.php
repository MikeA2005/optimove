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

            'tasks' => $this->whenLoaded('tasks', function () {
                return TaskResource::collection($this->tasks);
            }),
        ];
    }
}