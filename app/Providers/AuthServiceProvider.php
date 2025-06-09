<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

use App\Models\User;
use App\Models\Task;
use App\Models\Attendance;
use App\Models\Employee;
use App\Models\Disability;
use App\Models\Loan;
use App\Models\PayrollDetail;
use App\Models\PayrollHeader;
use App\Models\Overtime;
use App\Models\ShiftType;

use App\Policies\UserPolicy;
use App\Policies\TaskPolicy;
use App\Policies\AttendancePolicy;
use App\Policies\EmployeePolicy;
use App\Policies\DisabilityPolicy;
use App\Policies\LoanPolicy;
use App\Policies\PayrollDetailPolicy;
use App\Policies\PayrollHeaderPolicy;
use App\Policies\OvertimePolicy;
use App\Policies\ShiftTypePolicy;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        User::class => UserPolicy::class,
        Task::class => TaskPolicy::class,
        Attendance::class => AttendancePolicy::class,
        Employee::class => EmployeePolicy::class,
        Disability::class => DisabilityPolicy::class,
        Loan::class => LoanPolicy::class,
        PayrollDetail::class => PayrollDetailPolicy::class,
        PayrollHeader::class => PayrollHeaderPolicy::class,
        Overtime::class => OvertimePolicy::class,
        ShiftType::class => ShiftTypePolicy::class,
    ];


    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        $this->registerPolicies();
    }
}
