<?php

namespace App\Http\Controllers;

use App\Exports\EmployeesExport;
use App\Models\Employee;
use App\Http\Requests\StoreEmployeeRequest;
use App\Http\Requests\UpdateEmployeeRequest;
use App\Http\Resources\EmployeeResource;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Maatwebsite\Excel\Facades\Excel;

class EmployeeController extends Controller
{
    use AuthorizesRequests;
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $this->authorize('viewAny', Employee::class);
        $employees = Employee::with('user')
            ->when($request->has('last_name'), function ($query) use ($request) {
                $query->where('last_name', 'like', '%' . $request->input('last_name') . '%');
            })
            ->when($request->has('documento_number'), function ($query) use ($request) {
                $query->where('documento_number', 'like', '%' . $request->input('documento_number') . '%');
            })
            ->orderBy('created_at', 'desc')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Employees/Index', [
            'employees' => EmployeeResource::collection($employees),
            'users' => UserResource::collection(User::all()),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $this->authorize('create', Employee::class);
        return $this->index(new Request());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreEmployeeRequest $request)
    {
        $this->authorize('create', Employee::class);
        try {
            Employee::create($request->validated());
            return redirect()->route('employees.index')->with('flash.success', 'Employee created successfully.');
        } catch (\Exception $e) {
            return redirect()->back()->with('flash.error', 'Error creating employee.');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Employee $employee)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Employee $employee)
    {
        $this->authorize('update', $employee);
        return Inertia::render('Employees/Index', [
            'employee' => new EmployeeResource($employee),
            'users' => UserResource::collection(User::all()),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateEmployeeRequest $request, Employee $employee)
    {
        $this->authorize('update', $employee);
        try {
            $employee->update($request->validated());
            return redirect()->route('employees.index')->with('flash.success', 'Employee updated successfully.');
        } catch (\Exception $e) {
            return redirect()->back()->with('flash.error', 'Error updating employee.');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Employee $employee)
    {
        $this->authorize('delete', $employee);
        try {
            $employee->delete();
            return redirect()->route('employees.index')->with('flash.success', 'Employee deleted successfully.');
        } catch (\Exception $e) {
            return redirect()->back()->with('flash.error', 'Error deleting employee.');
        }
    }

    public function export()
    {
        try {
            return Excel::download(new EmployeesExport, 'empleados.xlsx');
        } catch (\Exception $e) {
            return redirect()->back()->with('flash.error', 'Error exporting employees.');
        }
    }
}
