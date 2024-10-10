<?php

use App\Http\Controllers\AttendanceController;
use App\Http\Controllers\CityController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\DisabilityController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\LoanController;
use App\Http\Controllers\OvertimeController;
use App\Http\Controllers\PayrollDetailController;
use App\Http\Controllers\PayrollHeaderController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VacationController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::redirect('/', '/dashboard');

Route::middleware('auth')->group(function () {
    Route::get('dashboard', fn() => Inertia::render('Dashboard'))->name('dashboard');
    Route::resource('cities', CityController::class)->only(['index', 'store', 'update', 'destroy'])->names('cities');
    Route::resource('clients', ClientController::class)->except('show')->names('clients');
    Route::resource('employees', EmployeeController::class)->names('employees');
    Route::resource('attendances', AttendanceController::class)->names('attendances');
    Route::resource('disabilities', DisabilityController::class)->names('disabilities');
    Route::resource('overtimes', OvertimeController::class)->names('overtimes');
    Route::resource('loans', LoanController::class)->names('loans');
    Route::resource('vacations', VacationController::class)->names('vacations');
    Route::resource('payroll-headers', PayrollHeaderController::class)->names('payroll-headers');
    Route::resource('payroll-details', PayrollDetailController::class)->names('payroll-details');
    Route::resource('users', UserController::class)->names('users');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
