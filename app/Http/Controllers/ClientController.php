<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreClientRequest;
use App\Http\Requests\UpdateClientRequest;
use App\Http\Resources\CityResource;
use App\Http\Resources\ClientResource;
use App\Models\City;
use App\Models\Client;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ClientController extends Controller
{
    public function index(Request $request)
    {
        $clients = Client::query()
            ->when($request->has('company_name'), function ($query) use ($request) {
                $query->where('company_name', 'like', '%' . $request->input('company_name') . '%');
            })
            ->when($request->has('nit'), function ($query) use ($request) {
                $query->where('nit', 'like', '%' . $request->input('nit') . '%');
            })
            ->with('cities')
            ->orderBy('created_at', 'desc')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Clients/Index', [
            'clients' => ClientResource::collection($clients),
            'cities' => CityResource::collection(City::all())->toArray($request),
        ]);
    }

    public function create()
    {
        return $this->index(new Request());
    }

    public function store(StoreClientRequest $request)
    {
        try {
            $client = Client::create($request->all());
            $client->cities()->attach($request->cities);
            return redirect()->route('clients.index')->with('flash.success', 'Client created successfully.');
        } catch (\Exception $e) {
            return redirect()->back()->with('flash.error', 'Error creating client.');
        }
    }

    public function edit(Client $client)
    {
        $cities = City::all();

        return Inertia::render('Clients/Index', [
            'client' => new ClientResource($client),
            'cities' => CityResource::collection($cities),
        ]);
    }

    public function update(UpdateClientRequest $request, Client $client)
    {
        try {
            $client->update($request->all());
            $client->cities()->sync($request->cities);
            return redirect()->route('clients.index')->with('flash.success', 'Client updated successfully.');
        } catch (\Exception $e) {
            return redirect()->back()->with('flash.error', 'Error updating client.');
        }
    }

    public function destroy(Client $client)
    {
        try {
            $client->delete();
            return redirect()->route('clients.index')->with('flash.success', 'Client deleted successfully.');
        } catch (\Exception $e) {
            return redirect()->back()->with('flash.error', 'Error deleting client.');
        }
    }
}
