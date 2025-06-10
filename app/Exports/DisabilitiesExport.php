<?php

namespace App\Exports;

use App\Models\Disability;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class DisabilitiesExport implements FromCollection, WithHeadings, WithMapping
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return Disability::with('employee')->get();
    }

    public function headings(): array
    {
        return [
            'ID',
            'Empleado',
            'Fecha de Inicio',
            'Fecha de Fin',
            'Tipo de Discapacidad',
            'Descripción',
        ];
    }
    public function map($disability): array
    {
        return [
            $disability->id,
            $disability->employee ? $disability->employee->first_name . ' ' . $disability->employee->last_name : 'N/A',
            $disability->start_date ? $disability->start_date->format('d-m-Y') : 'N/A',
            $disability->end_date ? $disability->end_date->format('d-m-Y') : 'N/A',
            $disability->type,
            $disability->description,
        ];
    }
}
