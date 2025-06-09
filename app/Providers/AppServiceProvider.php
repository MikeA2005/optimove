<?php

namespace App\Providers;

use App\Models\Attendance;
use App\Models\PayrollDetail;
use App\Observers\AttendanceObserver;
use App\Observers\PayrollDetailObserver;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        PayrollDetail::observe(PayrollDetailObserver::class);
        Attendance::observe(AttendanceObserver::class);
    }
}
