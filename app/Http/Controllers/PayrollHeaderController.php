<?php

namespace App\Http\Controllers;

use App\Models\PayrollHeader;
use App\Http\Requests\StorePayrollHeaderRequest;
use App\Http\Requests\UpdatePayrollHeaderRequest;
use App\Http\Resources\EmployeeResource;
use App\Http\Resources\PayrollDetailResource;
use App\Http\Resources\PayrollHeaderResource;
use App\Models\Employee;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PayrollHeaderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $payrollHeaders = PayrollHeader::query()
            ->when($request->has('name'), function ($query) use ($request) {
                $query->where('name', 'like', '%' . $request->input('name') . '%');
            })
            ->orderBy('created_at', 'desc')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Payrolls/Headers/Index', [
            'payrollHeaders' => PayrollHeaderResource::collection($payrollHeaders),
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
    public function store(StorePayrollHeaderRequest $request)
    {
        try {
            PayrollHeader::create($request->validated());
            return redirect()->route('payroll-headers.index')->with('flash.success', 'Payroll Header created successfully');
        } catch (\Exception $e) {
            return redirect()->back()->with('flash.error', 'Error creating payroll header.');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(PayrollHeader $payrollHeader)
    {
        $payrollDetails = $payrollHeader->payrollDetails()->with('employee')->get();

        return Inertia::render('Payrolls/Details/Index', [
            'payrollHeader' => new PayrollHeaderResource($payrollHeader),
            'payrollDetails' => PayrollDetailResource::collection($payrollDetails),
            'employees' => EmployeeResource::collection(Employee::all()),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(PayrollHeader $payrollHeader)
    {
        return Inertia::render('Payrolls/Headers/Index', [
            'payrollHeader' => new PayrollHeaderResource($payrollHeader)
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePayrollHeaderRequest $request, PayrollHeader $payrollHeader)
    {
        try {
            $payrollHeader->update($request->validated());
            return redirect()->route('payroll-headers.index')->with('flash.success', 'Payroll Header updated successfully');
        } catch (\Exception $e) {
            return redirect()->back()->with('flash.error', 'Error updating payroll header.');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PayrollHeader $payrollHeader)
    {
        try {
            $payrollHeader->delete();
            return redirect()->route('payroll-headers.index')->with('flash.success', 'Payroll header deleted successfully.');
        } catch (\Exception $e) {
            return redirect()->back()->with('flash.error', 'Error deleting payroll header.');
        }
    }
}
