<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PayrollDetail extends Model
{
    use HasFactory;

    protected $guarded = ['id', 'created_at', 'updated_at'];

    // Relationships
    public function payrollHeader()
    {
        return $this->belongsTo(PayrollHeader::class);
    }

    public function employee()
    {
        return $this->belongsTo(Employee::class);
    }
}
