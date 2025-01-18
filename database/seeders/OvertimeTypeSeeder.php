<?php

namespace Database\Seeders;

use App\Models\OvertimeType;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class OvertimeTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        OvertimeType::factory()->create([
            'type_name' => 'Hora extra diurna',
            'surcharge_percentage' => 25,
        ]);

        OvertimeType::factory()->create([
            'type_name' => 'Hora extra nocturna',
            'surcharge_percentage' => 75,
        ]);

        OvertimeType::factory()->create([
            'type_name' => 'Hora extra diurna dominical o festiva',
            'surcharge_percentage' => 100,
        ]);

        OvertimeType::factory()->create([
            'type_name' => 'Hora extra nocturna dominical o festiva',
            'surcharge_percentage' => 150,
        ]);
    }
}
