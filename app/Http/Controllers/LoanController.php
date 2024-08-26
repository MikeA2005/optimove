<?php

namespace App\Http\Controllers;

use App\Models\Loan;
use App\Http\Requests\StoreLoanRequest;
use App\Http\Requests\UpdateLoanRequest;
use App\Http\Resources\EmployeeResource;
use App\Http\Resources\LoanResource;
use App\Models\Employee;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LoanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $loans = Loan::with('employee')
        ->when($request->has('employee_id'), function ($query) use ($request) {
            $query->where('employee_id', $request->input('employee_id'));
        })
        ->orderBy('created_at', 'desc')
        ->paginate(10)
        ->withQueryString();

        return Inertia::render('Loans/Index', [
            'loans' => LoanResource::collection($loans),
            'employees' => EmployeeResource::collection(Employee::all()),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Loans/Index', [
            'loan' => null,
            'employees' => EmployeeResource::collection(Employee::all()),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreLoanRequest $request)
    {
        try {
            Loan::create($request->validated());
            return redirect()->route('loans.index')->with('flash.success', 'Loan created successfully.');
        } catch (\Exception $e) {
            return redirect()->back()->with('flash.error', 'Error creating loan.');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Loan $loan)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Loan $loan)
    {
        return Inertia::render('Loans/Index', [
            'loan' => new LoanResource($loan),
            'employees' => EmployeeResource::collection(Employee::all()),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateLoanRequest $request, Loan $loan)
    {
        try {
            $loan->update($request->validated());
            return redirect()->route('loans.index')->with('flash.success', 'Loan updated successfully.');
        } catch (\Exception $e) {
            return redirect()->back()->with('flash.error', 'Error updating loan.');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Loan $loan)
    {
        try {
            $loan->delete();
            return redirect()->route('loans.index')->with('flash.success', 'Loan deleted successfully.');
        } catch (\Exception $e) {
            return redirect()->back()->with('flash.error', 'Error deleting loan.');
        }
    }
}
