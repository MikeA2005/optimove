<?php

namespace App\Http\Controllers;

use App\Exports\UsersExport;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Maatwebsite\Excel\Facades\Excel;

class UserController extends Controller
{
    use AuthorizesRequests;
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $this->authorize('viewAny', User::class);
        $users = User::query()
            ->when($request->has('email'), function($query) use ($request) {
                $query->where('email', 'like', '%' . $request->input('email') . '%');
            })
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return inertia('Users/Index', [
            'users' => UserResource::collection($users),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $this->authorize('create', User::class);
        return $this->index(new Request());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        $this->authorize('create', User::class);
        try {
            User::create($request->validated());
            return redirect()->route('users.index')->with('flash.success', 'User created successfully.');
        } catch (\Exception $e) {
            return redirect()->back()->with('flash.error', 'Error creating user.');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        $this->authorize('update', $user);
        return inertia('Users/Index', [
            'user' => new UserResource($user),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        $this->authorize('update', $user);
        try {
            $user->update($request->validated());
            return redirect()->route('users.index')->with('flash.success', 'User updated successfully.');
        } catch (\Exception $e) {
            return redirect()->back()->with('flash.error', 'Error updating user.');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $this->authorize('delete', $user);
        
        try {
            $user->delete();
            return redirect()->route('users.index')->with('flash.success', 'User deleted successfully.');
        } catch (\Exception $e) {
            return redirect()->back()->with('flash.error', 'Error deleting user.');
        }
    }
}
