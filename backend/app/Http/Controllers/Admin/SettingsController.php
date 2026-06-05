<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\CompanyInfo;
use App\Models\ContactInfo;
use Illuminate\Http\Request;

class SettingsController extends Controller
{
    public function updateCompany(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:20',
            'address' => 'required|string|max:255',
            'city' => 'required|string|max:100',
            'country' => 'required|string|max:100',
            'latitude' => 'nullable|numeric',
            'longitude' => 'nullable|numeric',
            'legal_text' => 'nullable|string',
            'privacy_text' => 'nullable|string',
        ]);

        // Update or create company info
        $company = CompanyInfo::firstOrCreate(
            [],
            [
                'name' => $validated['name'],
                'description' => $validated['description'] ?? '',
            ]
        );

        $company->update([
            'name' => $validated['name'],
            'description' => $validated['description'] ?? '',
            'legal_text' => $validated['legal_text'] ?? null,
            'privacy_text' => $validated['privacy_text'] ?? null,
        ]);

        // Update contact info
        $fullAddress = "{$validated['address']}, {$validated['city']}, {$validated['country']}";

        ContactInfo::where('label', 'Adresse')->update(['value' => $fullAddress]);
        if (!ContactInfo::where('label', 'Adresse')->exists()) {
            ContactInfo::create(['label' => 'Adresse', 'value' => $fullAddress]);
        }

        ContactInfo::where('label', 'Email')->update(['value' => $validated['email']]);
        if (!ContactInfo::where('label', 'Email')->exists()) {
            ContactInfo::create(['label' => 'Email', 'value' => $validated['email']]);
        }

        ContactInfo::where('label', 'Telephone')->update(['value' => $validated['phone']]);
        if (!ContactInfo::where('label', 'Telephone')->exists()) {
            ContactInfo::create(['label' => 'Telephone', 'value' => $validated['phone']]);
        }

        return response()->json([
            'success' => true,
            'message' => 'Paramètres mis à jour avec succès',
            'data' => $company,
        ]);
    }

    public function updateLegal(Request $request)
    {
        $validated = $request->validate([
            'legal_text' => 'nullable|string',
            'privacy_text' => 'nullable|string',
        ]);

        $company = CompanyInfo::firstOrCreate(
            [],
            [
                'name' => 'Immobilier Pluriel',
            ]
        );

        $company->update([
            'legal_text' => $validated['legal_text'] ?? null,
            'privacy_text' => $validated['privacy_text'] ?? null,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Pages légales mises à jour avec succès',
            'data' => $company,
        ]);
    }
}
