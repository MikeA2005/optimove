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
        $this->updateSettlementBase($payrollDetail);
    }

    /**
     * Handle the PayrollDetail "updated" event.
     */
    public function updated(PayrollDetail $payrollDetail)
    {
        $this->updateSettlementBase($payrollDetail);
    }

    /**
     * Handle the PayrollDetail "deleted" event.
     */
    public function deleted(PayrollDetail $payrollDetail)
    {
        $this->updateSettlementBase($payrollDetail);
    }

    private function updateSettlementBase(PayrollDetail $payrollDetail)
    {
        $payrollHeader = $payrollDetail->payrollHeader;
        $payrollHeader->settlement_base = $this->calculateSettlementBase($payrollHeader);
        $payrollHeader->save();
    }

    private function calculateSettlementBase($payrollHeader)
    {
        return $payrollHeader->payrollDetails()->sum('net_pay'); 
    }
}
