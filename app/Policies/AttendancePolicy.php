<?php

namespace App\Policies;

use App\Models\Attendance;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class AttendancePolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return $user->role === 'rrhh' || $user->role === 'admin' || $user->role === 'operaciones';
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->role === 'rrhh' || $user->role === 'admin' || $user->role === 'operaciones';
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Attendance $attendance): bool
    {
        if ($user->role === 'rrhh' || $user->role === 'admin') {
            return true;
        }

        if ($user->role === 'operaciones') {
            return $attendance->date === now()->toDateString();
        }
        return false;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Attendance $attendance): bool
    {
        return $user->role === 'admin' || $user->role === 'rrhh';
    }
}
