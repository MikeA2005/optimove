<?php

namespace App\Http\Controllers;

use App\Models\Attendance;
use App\Http\Requests\StoreAttendanceRequest;
use App\Http\Requests\UpdateAttendanceRequest;
use App\Http\Resources\AttendanceResource;
use App\Http\Resources\ClientResource;
use App\Http\Resources\EmployeeResource;
use App\Models\Client;
use App\Models\Employee;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AttendanceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $attendances = Attendance::with('employee', 'client', 'city')
            ->when($request->has('date'), function ($query) use ($request) {
                $query->where('date', 'like', '%' . $request->input('date') . '%');
            })
            ->when($request->has('employee_id'), function ($query) use ($request) {
                $query->where('employee_id', 'like', '%' . $request->input('employee_id') . '%');
            })
            ->when($request->has('client_id'), function ($query) use ($request) {
                $query->where('client_id', 'like', '%' . $request->input('client_id') . '%');
            })
            ->when($request->has('city_id'), function ($query) use ($request) {
                $query->where('city_id', 'like', '%' . $request->input('city_id') . '%');
            })
            ->orderBy('created_at', 'desc')
            ->paginate(10)
            ->withQueryString();

            $clients = Client::with('cities')->get();

        return Inertia::render('Attendances/Index', [
            'attendances' => AttendanceResource::collection($attendances),
            'clients' => ClientResource::collection($clients),
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
    public function store(StoreAttendanceRequest $request)
    {
        try {
            Attendance::create($request->validated());
            return redirect()->route('attendances.index')->with('flash.success', 'Attendance created successfully.');
        } catch (\Exception $e) {
            return redirect()->back()->with('flash.error', 'Error creating attendance.');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Attendance $attendance)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Attendance $attendance)
    {
        $employees = Employee::all();
        $clients = Client::with('cities')->get();

        return Inertia::render('Attendances/Index', [
            'attendance' => new AttendanceResource($attendance),
            'employees' => EmployeeResource::collection($employees),
            'clients' => ClientResource::collection($clients),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAttendanceRequest $request, Attendance $attendance)
    {
        try {
            $attendance->update($request->validated());
            return redirect()->route('attendances.index')->with('flash.success', 'Attendance updated successfully.');
        } catch (\Exception $e) {
            return redirect()->back()->with('flash.error', 'Error updating attendance.');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Attendance $attendance)
    {
        try {
            $attendance->delete();
            return redirect()->route('attendances.index')->with('flash.success', 'Attendance deleted successfully.');
        } catch (\Exception $e) {
            return redirect()->back()->with('flash.error', 'Error deleting attendance.');
        }
    }
}
