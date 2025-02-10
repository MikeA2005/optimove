<?php

namespace Database\Seeders;

use App\Models\ShiftType;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ShiftTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $shiftTypes = [
            ['name' => 'TURNO DIURNO', 'value' => '0'],
            ['name' => 'TURNO NOCTURNO', 'value' => '0'],
            ['name' => 'TURNO DIURNO DOMINICAL O FESTIVO', 'value' => '0'],
            ['name' => 'TURNO NOCTURNO DOMINICAL O FESTIVO', 'value' => '0'],
            ['name' => 'HORA ADICIONAL DIURNA', 'value' => '0'],
            ['name' => 'HORA ADICIONAL NOCTURNA', 'value' => '0'],
            ['name' => 'HORA ADICIONAL DIURNA DOMINICAL O FESTIVO', 'value' => '0'],
            ['name' => 'HORA ADICIONAL NOCTURNA DOMINICAL O FESTIVO', 'value' => '0'],
        ];

        foreach ($shiftTypes as $shiftType) {
            ShiftType::create($shiftType);
        }
    }
}
