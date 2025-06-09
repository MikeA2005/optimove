<?php

namespace App\Policies;

use App\Models\Overtime;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class OvertimePolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user, Overtime $overtime): bool
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
    public function update(User $user, Overtime $overtime): bool
    {
        return $user->role === 'rrhh' || $user->role === 'admin' || $user->role === 'operaciones';
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Overtime $overtime): bool
    {
        return $user->role === 'admin' || $user->role === 'rrhh';
    }
}
