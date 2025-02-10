<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    protected $guarded = ['id', 'created_at', 'updated_at'];

    public function attendances()
    {
        return $this->hasMany(Attendance::class);
    }

    public function clients()
    {
        return $this->belongsToMany(Client::class, 'client_task');
    }
}
