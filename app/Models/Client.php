<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    use HasFactory;

    protected $fillable = ['company_name', 'nit'];

    public function cities()
    {
        return $this->belongsToMany(City::class, 'city_client');
    }

    public function attendances()
    {
        return $this->hasMany(Attendance::class);
    }
}
