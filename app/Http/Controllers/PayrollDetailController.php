<?php

namespace App\Http\Controllers;

use App\Models\PayrollDetail;
use App\Http\Requests\StorePayrollDetailRequest;
use App\Http\Requests\UpdatePayrollDetailRequest;
use App\Http\Resources\EmployeeResource;
use App\Http\Resources\PayrollDetailResource;
use App\Models\Employee;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PayrollDetailController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $payrollDetails = PayrollDetail::with('employee')
        ->when($request->has('employee_id'), function ($query) use ($request) {
            $query->where('employee_id', $request->input('employee_id'));
        })
        ->orderBy('created_at', 'desc')
        ->paginate(10)
        ->withQueryString();

        return Inertia::render('PayrollDetails/Index', [
            'payrollDetails' => PayrollDetailResource::collection($payrollDetails),
            'employees' => EmployeeResource::collection(Employee::all()),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('PayrollDetails/Index', [
            'payrollDetail' => null,
            'employees' => EmployeeResource::collection(Employee::all()),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePayrollDetailRequest $request)
    {
        try {
            PayrollDetail::create($request->validated());
            return redirect()->route('payroll-details.index')->with('flash.success', 'Payroll detail created successfully.');
        } catch (\Exception $e) {
            return redirect()->back()->with('flash.error', 'Error creating payroll detail.');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(PayrollDetail $payrollDetail)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(PayrollDetail $payrollDetail)
    {
        return Inertia::render('PayrollDetails/Index', [
            'payrollDetail' => new PayrollDetailResource($payrollDetail),
            'employees' => EmployeeResource::collection(Employee::all()),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePayrollDetailRequest $request, PayrollDetail $payrollDetail)
    {
        try {
            $payrollDetail->update($request->validated());
            return redirect()->route('payroll-details.index')->with('flash.success', 'Payroll detail updated successfully.');
        } catch (\Exception $e) {
            return redirect()->back()->with('flash.error', 'Error updating payroll detail.');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PayrollDetail $payrollDetail)
    {
        try {
            $payrollDetail->delete();
            return redirect()->route('payroll-details.index')->with('flash.success', 'Payroll detail deleted successfully.');
        } catch (\Exception $e) {
            return redirect()->back()->with('flash.error', 'Error deleting payroll detail.');
        }
    }
}
