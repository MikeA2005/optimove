<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class City extends Model
{
    use HasFactory;

    protected $fillable = ['city_name'];

    public function clients()
    {
        return $this->belongsToMany(Client::class, 'city_client');
    }

    public function attendances()
    {
        return $this->hasMany(Attendance::class);
    }
}
