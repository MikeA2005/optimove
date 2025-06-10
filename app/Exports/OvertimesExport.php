<?php

namespace App\Exports;

use App\Models\Overtime;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class OvertimesExport implements FromCollection, WithHeadings, WithMapping
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return Overtime::with('employee', 'overtimeType')->get();
    }

    public function headings(): array
    {
        return [
            'ID',
            'Fecha',
            'Horas',
            'Empleado',
            'Tipo de Horas Extras',
        ];
    }

    public function map($overtime): array
    {
        return [
            $overtime->id,
            $overtime->date ? $overtime->date->format('d-m-Y') : 'N/A',
            $overtime->hours,
            $overtime->employee ? $overtime->employee->first_name . ' ' . $overtime->employee->last_name : 'N/A',
            $overtime->overtimeType ? $overtime->overtimeType->name : 'N/A',
        ];
    }
}
