<?php

namespace App\Policies;

use App\Models\PayrollHeader;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class PayrollHeaderPolicy
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
    public function update(User $user, PayrollHeader $payrollHeader): bool
    {
        return $user->role === 'rrhh' || $user->role === 'admin';
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, PayrollHeader $payrollHeader): bool
    {
        return $user->role === 'admin' || $user->role === 'rrhh';
    }
}
