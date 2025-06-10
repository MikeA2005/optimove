<?php

namespace App\Exports;

use App\Models\Loan;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class LoansExport implements FromCollection, WithHeadings, WithMapping
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return Loan::with('employee')->get();
    }

    public function headings(): array
    {
        return [
            'ID',
            'Fecha',
            'Empleado',
            'Monto',
            'Cuotas',
            'Valor Cuota',
            'Monto Pendiente',
            'Periodo de descuento',
            'Estado',
        ];
    }

    public function map($loan): array
    {
        return [
            $loan->id,
            $loan->date ? $loan->date->format('d-m-Y') : 'N/A',
            $loan->employee ? $loan->employee->first_name . ' ' . $loan->employee->last_name : 'N/A',
            $loan->amount,
            $loan->installments,
            $loan->installment_value,
            $loan->pending_amount,
            $loan->discount_period,
            $loan->active ? 'Activo' : 'Inactivo',
        ];
    }
}
