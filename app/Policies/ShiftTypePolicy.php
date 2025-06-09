<?php

namespace App\Policies;

use App\Models\ShiftType;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class ShiftTypePolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return $user->role === 'rrhh' || $user->role === 'admin';
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->role === 'rrhh' || $user->role === 'admin';
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, ShiftType $shiftType): bool
    {
        return $user->role === 'rrhh' || $user->role === 'admin';
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, ShiftType $shiftType): bool
    {
        return $user->role === 'admin' || $user->role === 'rrhh';
    }
}
