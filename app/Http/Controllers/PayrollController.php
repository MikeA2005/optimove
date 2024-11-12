<?php

namespace App\Http\Controllers;

use App\Models\Payroll;
use App\Http\Requests\StorePayrollRequest;
use App\Http\Requests\UpdatePayrollRequest;
use App\Http\Resources\EmployeeResource;
use App\Http\Resources\PayrollResource;
use App\Models\Employee;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class PayrollController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $payrolls = Payroll::with('employee')
            ->when($request->has('employee_id'), function ($query) use ($request) {
                $query->where('employee_id', $request->input('employee_id'));
            })
            ->when($request->has('start_date'), function ($query) use ($request) {
                $query->where('start_date', $request->input('start_date'));
            })
            ->when($request->has('end_date'), function ($query) use ($request) {
                $query->where('end_date', $request->input('end_date'));
            })
            ->orderBy('created_at', 'desc')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Payrolls/Index', [
            'payrolls' => PayrollResource::collection($payrolls),
            'employees' => EmployeeResource::collection(Employee::all()),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return $this->index(new Request());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePayrollRequest $request)
    {
        try {
            Payroll::create($request->validated());
            return redirect()->route('payrolls.index')->with('flash.success', 'Payroll created successfully.');
        } catch (\Exception $e) {
            return redirect()->back()->with('flash.error', 'Error creating payroll.');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Payroll $payroll)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Payroll $payroll)
    {
        return Inertia::render('Payrolls/Index', [
            'payroll' => new PayrollResource($payroll),
            'employees' => EmployeeResource::collection(Employee::all()),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePayrollRequest $request, Payroll $payroll)
    {
        try {
            $payroll->update($request->validated());
            return redirect()->route('payrolls.index')->with('flash.success', 'Payroll updated successfully.');
        } catch (\Exception $e) {
            return redirect()->back()->with('flash.error', 'Error updating payroll.');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Payroll $payroll)
    {
        try {
            $payroll->delete();
            return redirect()->route('payrolls.index')->with('flash.success', 'Payroll deleted successfully.');
        } catch (\Exception $e) {
            return redirect()->back()->with('flash.error', 'Error deleting payroll.');
        }
    }
}
