<?php

namespace App\Exports;

use App\Models\Attendance;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class AttendancesExport implements FromCollection, WithHeadings, WithMapping
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return Attendance::select('id', 'date', 'employee_id', 'client_id', 'city_id', 'shift_type_id', 'task_id')->get();
    }

    public function headings(): array
    {
        return [
            'ID',
            'Fecha',
            'Empleado',
            'Cliente',
            'Ciudad',
            'Tipo de Turno',
            'Tarea',
        ];
    }

    public function map($attendance): array
    {
        return [
            $attendance->id,
            $attendance->date->format('d-m-Y'),
            $attendance->employee->name ?? 'N/A',
            $attendance->client->name ?? 'N/A',
            $attendance->city->name ?? 'N/A',
            $attendance->shiftType->name ?? 'N/A',
            $attendance->task->name ?? 'N/A',
        ];
    }
}
