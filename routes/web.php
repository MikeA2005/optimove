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
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Redirige la raíz al dashboard
Route::redirect('/', '/dashboard');

// Agrupa todas las rutas que requieren autenticación
Route::middleware('auth')->group(function () {
    // Dashboard principal
    Route::get('dashboard', fn() => Inertia::render('Dashboard'))->name('dashboard');

    // Recursos principales de la aplicación
    Route::resource('cities', CityController::class)->names('cities');
    Route::resource('clients', ClientController::class)->names('clients');
    Route::resource('employees', EmployeeController::class)->names('employees');
    Route::resource('attendances', AttendanceController::class)->names('attendances');
    Route::resource('disabilities', DisabilityController::class)->names('disabilities');
    Route::resource('overtimes', OvertimeController::class)->names('overtimes');
    Route::resource('loans', LoanController::class)->names('loans');
    Route::resource('payroll-headers', PayrollHeaderController::class)->except('show')->names('payroll-headers');
    Route::resource('payroll-details', PayrollDetailController::class)->names('payroll-details');
    Route::resource('users', UserController::class)->names('users');

    // Rutas para exportar datos a Excel
    Route::get('employees-export', [EmployeeController::class, 'export'])->name('employees.export');
    Route::get('attendances-export', [AttendanceController::class, 'export'])->name('attendances.export');
    Route::get('disabilities-export', [DisabilityController::class, 'export'])->name('disabilities.export');
    Route::get('overtimes-export', [OvertimeController::class, 'export'])->name('overtimes.export');
    Route::get('loans-export', [LoanController::class, 'export'])->name('loans.export');
    
    // Ruta para mostrar los detalles de un Payroll Header específico
    Route::get('/payroll-headers/{payrollHeader}/details', [PayrollHeaderController::class, 'show'])->name('payroll-headers.show'); 

    // Rutas para la gestión del perfil de usuario autenticado
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Rutas de autenticación (login, logout, etc.)
require __DIR__.'/auth.php';
