<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PayrollHeader extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'start_date',
        'end_date',
        'settlement_base',
    ];

    public function payrollDetails()
    {
        return $this->hasMany(PayrollDetail::class);
    }
}
