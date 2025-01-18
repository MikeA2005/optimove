<?php

namespace App\Observers;

use App\Models\PayrollDetail;

class PayrollDetailObserver
{
    /**
     * Handle the PayrollDetail "created" event.
     */
    public function created(PayrollDetail $payrollDetail)
    {
        $payrollHeader = $payrollDetail->payrollHeader;
        $payrollHeader->settlement_base = $this->calculateSettlementBase($payrollHeader);
        $payrollHeader->save();
    }

    /**
     * Handle the PayrollDetail "updated" event.
     */
    public function updated(PayrollDetail $payrollDetail)
    {
        $payrollHeader = $payrollDetail->payrollHeader;
        $payrollHeader->settlement_base = $this->calculateSettlementBase($payrollHeader);
        $payrollHeader->save();
    }

    /**
     * Handle the PayrollDetail "deleted" event.
     */
    public function deleted(PayrollDetail $payrollDetail)
    {
        $payrollHeader = $payrollDetail->payrollHeader;
        $payrollHeader->settlement_base = $this->calculateSettlementBase($payrollHeader);
        $payrollHeader->save();
    }

    private function calculateSettlementBase($payrollHeader)
    {
        $total = $payrollHeader->payrollDetails()->sum('net_pay'); 
        return $total;
    }
}
