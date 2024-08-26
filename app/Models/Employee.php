<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    use HasFactory;

    protected $guarded = ['id', 'created_at', 'updated_at'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function attendances()
    {
        return $this->hasMany(Attendance::class);
    }

    public function disabilities()
    {
        return $this->hasMany(Disability::class);
    }

    public function overtimes()
    {
        return $this->hasMany(Overtime::class);
    }

    public function loans()
    {
        return $this->hasMany(Loan::class);
    }

    public function vacations()
    {
        return $this->hasMany(Vacation::class);
    }

    public function payrollDetails()
    {
        return $this->hasMany(PayrollDetail::class);
    }
}