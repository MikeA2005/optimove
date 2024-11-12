<?php

namespace Database\Seeders;

use App\Models\OvertimeType;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => bcrypt('12345678'),
        ]);

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
