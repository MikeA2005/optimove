<?php

namespace App\Http\Controllers;

use App\Exports\DisabilitiesExport;
use App\Models\Disability;
use App\Http\Requests\StoreDisabilityRequest;
use App\Http\Requests\UpdateDisabilityRequest;
use App\Http\Resources\DisabilityResource;
use App\Http\Resources\EmployeeResource;
use App\Models\Employee;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Maatwebsite\Excel\Facades\Excel;

class DisabilityController extends Controller
{
    use AuthorizesRequests;
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $this->authorize('viewAny', Disability::class);

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
        $this->authorize('create', Disability::class);
        return $this->index(new Request());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreDisabilityRequest $request)
    {
        $this->authorize('create', Disability::class);
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
        $this->authorize('update', $disability);
        return Inertia::render('Disabilities/Index', [
            'disabilities' => $disability,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateDisabilityRequest $request, Disability $disability)
    {
        $this->authorize('update', $disability);
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
        $this->authorize('delete', $disability);
        try {
            $disability->delete();
            return redirect()->route('disabilities.index')->with('flash.success', 'Disability deleted successfully.');
        } catch (\Exception $e) {
            return redirect()->back()->with('flash.error', 'An error occurred while deleting the disability.');
        }
    }

    public function export()
    {
        try {
            return Excel::download(new DisabilitiesExport, 'incapacidades.xlsx');
        } catch (\Exception $e) {
            return redirect()->back()->with('flash.error', 'An error occurred while exporting disabilities.');
        }
    }
}
