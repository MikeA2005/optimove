<?php

namespace App\Http\Controllers;

use App\Models\Disability;
use App\Http\Requests\StoreDisabilityRequest;
use App\Http\Requests\UpdateDisabilityRequest;
use App\Http\Resources\DisabilityResource;
use App\Http\Resources\EmployeeResource;
use App\Models\Employee;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DisabilityController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $disabilities = Disability::with('employee')
        ->when($request->has('employee_id'), function ($query) use ($request) {
            $query->where('employee_id', 'like', '%' . $request->input('employee_id') . '%');
        })
        ->when($request->has('start_date'), function ($query) use ($request) {
            $query->where('start_date', 'like', '%' . $request->input('start_date') . '%');
        })
        ->orderBy('created_at', 'desc')
        ->paginate(10)
        ->withQueryString();

        return Inertia::render('Disabilities/Index', [
            'disabilities' => DisabilityResource::collection($disabilities),
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
    public function store(StoreDisabilityRequest $request)
    {
        try {
            Disability::create($request->validated());
            return redirect()->route('disabilities.index')->with('flash.success', 'Disability created successfully.');
        } catch (\Exception $e) {
            return redirect()->back()->with('flash.error', 'An error occurred while creating the disability.');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Disability $disability)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Disability $disability)
    {
        return Inertia::render('Disabilities/Index', [
            'disabilities' => $disability,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateDisabilityRequest $request, Disability $disability)
    {
        try {
            $disability->update($request->validated());
            return redirect()->route('disabilities.index')->with('flash.success', 'Disability updated successfully.');
        } catch (\Exception $e) {
            return redirect()->back()->with('flash.error', 'An error occurred while updating the disability.');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Disability $disability)
    {
        try {
            $disability->delete();
            return redirect()->route('disabilities.index')->with('flash.success', 'Disability deleted successfully.');
        } catch (\Exception $e) {
            return redirect()->back()->with('flash.error', 'An error occurred while deleting the disability.');
        }
    }
}
