<?php

namespace App\Http\Controllers;

use App\Models\Overtime;
use App\Http\Requests\StoreOvertimeRequest;
use App\Http\Requests\UpdateOvertimeRequest;
use App\Http\Resources\EmployeeResource;
use App\Http\Resources\OvertimeResource;
use App\Http\Resources\OvertimeTypeResource;
use App\Models\Employee;
use App\Models\OvertimeType;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class OvertimeController extends Controller
{
    use AuthorizesRequests;
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $this->authorize('viewAny', Overtime::class);
        $overtimes = Overtime::with('employee', 'overtimeType')
        ->when($request->has('employee_id'), function ($query) use ($request) {
            $query->where('employee_id', 'like', '%' . $request->input('employee_id') . '%');
        })
        ->when($request->has('date'), function ($query) use ($request) {
            $query->where('date', 'like', '%' . $request->input('date') . '%');
        })
        ->orderBy('created_at', 'desc')
        ->paginate(10)
        ->withQueryString();

        return Inertia::render('Overtimes/Index', [
            'overtimes' => OvertimeResource::collection($overtimes),
            'employees' => EmployeeResource::collection(Employee::all()),
            'overtimeTypes' => OvertimeTypeResource::collection(OvertimeType::all()),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $this->authorize('create', Overtime::class);
        return $this->index(new Request());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreOvertimeRequest $request)
    {
        $this->authorize('create', Overtime::class);
        try {
            Overtime::create($request->validated());
            return redirect()->route('overtimes.index')->with('flash.success', 'Overtime created successfully.');
        } catch (\Exception $e) {
            return redirect()->back()->with('flash.error', 'Error creating overtime.');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Overtime $overtime)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Overtime $overtime)
    {
        $this->authorize('update', $overtime);
        return Inertia::render('Overtimes/Index', [
            'overtime' => new OvertimeResource($overtime),
            'employees' => EmployeeResource::collection(Employee::all()),
            'overtimeTypes' => OvertimeTypeResource::collection(OvertimeType::all()),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateOvertimeRequest $request, Overtime $overtime)
    {
        $this->authorize('update', $overtime);
        try {
            $overtime->update($request->validated());
            return redirect()->route('overtimes.index')->with('flash.success', 'Overtime updated successfully.');
        } catch (\Exception $e) {
            return redirect()->back()->with('flash.error', 'Error updating overtime.');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Overtime $overtime)
    {
        $this->authorize('delete', $overtime);
        try {
            $overtime->delete();
            return redirect()->route('overtimes.index')->with('flash.success', 'Overtime deleted successfully.');
        } catch (\Exception $e) {
            return redirect()->back()->with('flash.error', 'Error deleting overtime.');
        }
    }
}
