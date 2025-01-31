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
        $overtimeTypes = [
            ['type_name' => 'HORA EXTRA DIURNA', 'surcharge_percentage' => 25],
            ['type_name' => 'HORA EXTRA NOCTURNA', 'surcharge_percentage' => 75],
            ['type_name' => 'HORA EXTRA DIURNA DOMINICAL O FESTIVA', 'surcharge_percentage' => 100],
            ['type_name' => 'HORA EXTRA NOCTURNA DOMINICAL O FESTIVA', 'surcharge_percentage' => 150],
            ['type_name' => 'RECARGO NOCTURNO', 'surcharge_percentage' => 35],
            ['type_name' => 'RECARGO DOMINICAL O FESTIVO', 'surcharge_percentage' => 75],
            ['type_name' => 'RECARGO NOCTURNO DOMINICAL O FESTIVO', 'surcharge_percentage' => 110],
        ];

        foreach ($overtimeTypes as $overtimeType) {
            OvertimeType::create($overtimeType);
        }
    }
}
