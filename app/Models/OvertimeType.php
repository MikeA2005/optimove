<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OvertimeType extends Model
{
    use HasFactory;

    protected $fillable = [
        'type_name',
        'surcharge_percentage',
    ];

    public function overtimes()
    {
        return $this->hasMany(Overtime::class);
    }
}
