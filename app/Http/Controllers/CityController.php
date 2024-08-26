<?php

namespace App\Http\Controllers;

use App\Http\Resources\CityResource;
use App\Models\City;
use Illuminate\Http\Request;

class CityController extends Controller
{
    public function index()
    {
        $query = City::query();

        if (request('city_name')) {
            $query->where('city_name', 'like', '%' . request('city_name') . '%');
        }

        $cities = $query->orderBy('created_at', 'desc')->paginate(10);

        $filteredQueryParams = array_intersect_key(request()->query(), ['page' => '']);

        return inertia('Cities/Index', [
            'cities' => CityResource::collection($cities),
            'queryParams' => $filteredQueryParams,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'city_name' => 'required|string|max:255',
        ]);

        City::create($validated);

        return to_route('cities.index')->with('flash.success', 'City added successfully.');
    }

    public function update(Request $request, City $city)
    {
        $validated = $request->validate([
            'city_name' => 'required|string|max:255',
        ]);

        $city->update($validated);

        return redirect(route('cities.index'))->with('flash.success', 'City updated successfully.');
    }

    public function destroy(City $city)
    {
        $city->delete();

        return redirect(route('cities.index'))->with('flash.success', 'City deleted successfully.');
    }
}
