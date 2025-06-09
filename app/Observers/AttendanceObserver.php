<?php

namespace App\Observers;

use App\Models\Attendance;
use App\Models\PayrollDetail;
use App\Models\PayrollHeader;

class AttendanceObserver
{
    /**
     * Handle the Attendance "created" event.
     */
    public function created(Attendance $attendance): void
    {
        $this->recalculatePayroll($attendance);
    }

    /**
     * Handle the Attendance "updated" event.
     */
    public function updated(Attendance $attendance): void
    {
        $this->recalculatePayroll($attendance);
    }

    /**
     * Handle the Attendance "deleted" event.
     */
    public function deleted(Attendance $attendance): void
    {
        $this->recalculatePayroll($attendance);
    }

    /**
     * Recalcula la nómina correspondiente al empleado y fecha de la asistencia.
     */
    protected function recalculatePayroll(Attendance $attendance): void
    {
        $payrollHeader = PayrollHeader::where('start_date', '<=', $attendance->date)
            ->where('end_date', '>=', $attendance->date)
            ->where('payroll_type', $attendance->employee->contract_type)
            ->first();

        if ($payrollHeader) {
            $payrollDetail = PayrollDetail::where('employee_id', $attendance->employee_id)
                ->where('payroll_header_id', $payrollHeader->id)
                ->first();

            if ($payrollDetail) {
                $payrollDetail->calculatePayroll();
                $payrollDetail->save();
            }
        }
    }
}
