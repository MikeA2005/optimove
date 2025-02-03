<?php

namespace Database\Seeders;

use App\Models\PayrollHeader;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PayrollHeaderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $payrollHeaders = [
            // Primer corte 15 y 30
            ['name' => 'NOMINA BUCARAMANGA-CUCUTA', 'start_date' => '2025-01-01', 'end_date' => '2025-01-15', 'payroll_type' => 'DEP', 'settlement_base' => 0],
            ['name' => 'NOMINA BUCARAMANGA-CUCUTA', 'start_date' => '2025-01-16', 'end_date' => '2025-01-30', 'payroll_type' => 'DEP', 'settlement_base' => 0],

            ['name' => 'NOMINA EMO', 'start_date' => '2025-01-01', 'end_date' => '2025-01-15', 'payroll_type' => 'DEP', 'settlement_base' => 0],
            ['name' => 'NOMINA EMO', 'start_date' => '2025-01-16', 'end_date' => '2025-01-30', 'payroll_type' => 'DEP', 'settlement_base' => 0],

            ['name' => 'NOMINA ADMINISTRATIVA', 'start_date' => '2025-01-01', 'end_date' => '2025-01-15', 'payroll_type' => 'DEP', 'settlement_base' => 0],
            ['name' => 'NOMINA ADMINISTRATIVA', 'start_date' => '2025-01-16', 'end_date' => '2025-01-30', 'payroll_type' => 'DEP', 'settlement_base' => 0],

            ['name' => 'NOMINA ENVIA', 'start_date' => '2025-01-01', 'end_date' => '2025-01-15', 'payroll_type' => 'DEP', 'settlement_base' => 0],
            ['name' => 'NOMINA ENVIA', 'start_date' => '2025-01-16', 'end_date' => '2025-01-30', 'payroll_type' => 'DEP', 'settlement_base' => 0],

            ['name' => 'NOMINA GENERAL', 'start_date' => '2025-01-01', 'end_date' => '2025-01-15', 'payroll_type' => 'IND', 'settlement_base' => 0],
            ['name' => 'NOMINA GENERAL', 'start_date' => '2025-01-16', 'end_date' => '2025-01-30', 'payroll_type' => 'IND', 'settlement_base' => 0],

            ['name' => 'NOMINCA ENVIA', 'start_date' => '2025-01-01', 'end_date' => '2025-01-15', 'payroll_type' => 'IND', 'settlement_base' => 0],
            ['name' => 'NOMINCA ENVIA', 'start_date' => '2025-01-16', 'end_date' => '2025-01-30', 'payroll_type' => 'IND', 'settlement_base' => 0],

            // Segundo corte 5 y 20
            ['name' => 'ICOLTRANS BQUILLA/STA MARTA', 'start_date' => '2025-01-05', 'end_date' => '2025-01-19', 'payroll_type' => 'DEP', 'settlement_base' => 0],
            ['name' => 'ICOLTRANS BQUILLA/STA MARTA', 'start_date' => '2025-01-20', 'end_date' => '2025-02-04', 'payroll_type' => 'DEP', 'settlement_base' => 0],

            ['name' => 'ICOLTRANS BQUILLA', 'start_date' => '2025-01-05', 'end_date' => '2025-01-19', 'payroll_type' => 'DEP', 'settlement_base' => 0],
            ['name' => 'ICOLTRANS BQUILLA', 'start_date' => '2025-01-20', 'end_date' => '2025-02-04', 'payroll_type' => 'DEP', 'settlement_base' => 0],

            ['name' => 'ICOLTRANS MONTERIA', 'start_date' => '2025-01-05', 'end_date' => '2025-01-19', 'payroll_type' => 'DEP', 'settlement_base' => 0],
            ['name' => 'ICOLTRANS MONTERIA', 'start_date' => '2025-01-20', 'end_date' => '2025-02-04', 'payroll_type' => 'DEP', 'settlement_base' => 0],
            
            ['name' => 'ICOLTRANS RANSA', 'start_date' => '2025-01-05', 'end_date' => '2025-01-19', 'payroll_type' => 'DEP', 'settlement_base' => 0],
            ['name' => 'ICOLTRANS RANSA', 'start_date' => '2025-01-20', 'end_date' => '2025-02-04', 'payroll_type' => 'DEP', 'settlement_base' => 0],

            ['name' => 'ICOLTRANS CARTAGENA', 'start_date' => '2025-01-05', 'end_date' => '2025-01-19', 'payroll_type' => 'DEP', 'settlement_base' => 0],
            ['name' => 'ICOLTRANS CARTAGENA', 'start_date' => '2025-01-20', 'end_date' => '2025-02-04', 'payroll_type' => 'DEP', 'settlement_base' => 0],

            ['name' => 'NOMINA STA MARTA', 'start_date' => '2025-01-05', 'end_date' => '2025-01-19', 'payroll_type' => 'IND', 'settlement_base' => 0],
            ['name' => 'NOMINA STA MARTA', 'start_date' => '2025-01-20', 'end_date' => '2025-02-04', 'payroll_type' => 'IND', 'settlement_base' => 0],

            ['name' => 'ICOLTRANS BQUILLA', 'start_date' => '2025-01-05', 'end_date' => '2025-01-19', 'payroll_type' => 'IND', 'settlement_base' => 0],
            ['name' => 'ICOLTRANS BQUILLA', 'start_date' => '2025-01-20', 'end_date' => '2025-02-04', 'payroll_type' => 'IND', 'settlement_base' => 0],

            ['name' => 'ICOLTRANS BUCARAMANGA COLOUT', 'start_date' => '2025-01-05', 'end_date' => '2025-01-19', 'payroll_type' => 'IND', 'settlement_base' => 0],
            ['name' => 'ICOLTRANS BUCARAMANGA COLOUT', 'start_date' => '2025-01-20', 'end_date' => '2025-02-04', 'payroll_type' => 'IND', 'settlement_base' => 0],

            ['name' => 'ICOLTRANS BUCARAMANGA OPT', 'start_date' => '2025-01-05', 'end_date' => '2025-01-19', 'payroll_type' => 'IND', 'settlement_base' => 0],
            ['name' => 'ICOLTRANS BUCARAMANGA OPT', 'start_date' => '2025-01-20', 'end_date' => '2025-02-04', 'payroll_type' => 'IND', 'settlement_base' => 0],
        ];

        foreach ($payrollHeaders as $payrollHeader) {
            PayrollHeader::create($payrollHeader);
        }
    }
}
