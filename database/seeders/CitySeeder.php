<?php

namespace Database\Seeders;

use App\Models\City;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $cities = [
            ['city_name' => 'BUCARAMANGA'],
            ['city_name' => 'CUCUTA'],
            ['city_name' => 'BARRANQUILLA'],
            ['city_name' => 'SANTA MARTA'],
            ['city_name' => 'MONTERIA'],
            ['city_name' => 'CARTAGENA'],
        ];

        foreach ($cities as $city) {
            City::create($city);
        }
    }
}
