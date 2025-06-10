<?php

namespace App\Exports;

use App\Models\Employee;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class EmployeesExport implements FromCollection, WithHeadings, WithMapping
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return Employee::select('id', 'first_name', 'last_name', 'document_type', 'document_number', 'birth_date', 'hire_date', 'base_salary', 'transport_allowance', 'contract_type')->get();
    }

    public function headings(): array
    {
        return [
            'ID',
            'Nombre',
            'Apellido',
            'Tipo de Documento',
            'Número de Documento',
            'Fecha de Nacimiento',
            'Fecha de Contratación',
            'Salario Base',
            'Auxilio de Transporte',
            'Tipo de Contrato',
        ];
    }
    public function map($employee): array
    {
        return [
            $employee->id,
            $employee->first_name,
            $employee->last_name,
            $employee->document_type,
            $employee->document_number,
            $employee->birth_date ? \Carbon\Carbon::parse($employee->birth_date)->format('d-m-Y') : 'N/A',
            $employee->hire_date ? \Carbon\Carbon::parse($employee->hire_date)->format('d-m-Y') : 'N/A',
            $employee->base_salary,
            $employee->transport_allowance,
            $employee->contract_type,
        ];
    }
}
