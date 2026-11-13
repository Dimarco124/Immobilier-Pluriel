<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\CompanyInfo;
use App\Models\ContactInfo;
use App\Models\SiteSetting;
use App\Models\SocialLink;
use Illuminate\Http\Request;

class SettingsController extends Controller
{
    public function updateCompany(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:30',
            'whatsapp' => 'nullable|string|max:30',
            'facebook' => 'nullable|string|max:255',
            'instagram' => 'nullable|string|max:255',
            'linkedin' => 'nullable|string|max:255',
            'tiktok' => 'nullable|string|max:255',
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

        // Nettoyer et mettre a jour Adresse
        ContactInfo::whereIn('label', ['Adresse', 'address', 'Address'])->update(['label' => 'Adresse', 'value' => $fullAddress]);
        if (!ContactInfo::whereIn('label', ['Adresse', 'address', 'Address'])->exists()) {
            ContactInfo::create(['label' => 'Adresse', 'value' => $fullAddress, 'icon' => 'map-pin', 'order' => 1]);
        }

        // Nettoyer et mettre a jour Email
        ContactInfo::whereIn('label', ['Email', 'email'])->update(['label' => 'Email', 'value' => $validated['email']]);
        if (!ContactInfo::whereIn('label', ['Email', 'email'])->exists()) {
            ContactInfo::create(['label' => 'Email', 'value' => $validated['email'], 'icon' => 'mail', 'order' => 3]);
        }

        // Nettoyer et mettre a jour Téléphone (support avec ou sans accent)
        ContactInfo::whereIn('label', ['Telephone', 'Téléphone'])->update(['label' => 'Téléphone', 'value' => $validated['phone']]);
        if (!ContactInfo::whereIn('label', ['Telephone', 'Téléphone'])->exists()) {
            ContactInfo::create(['label' => 'Téléphone', 'value' => $validated['phone'], 'icon' => 'phone', 'order' => 2]);
        }
        // Supprimer d eventuels doublons
        $phoneIds = ContactInfo::whereIn('label', ['Telephone', 'Téléphone'])->pluck('id');
        if ($phoneIds->count() > 1) {
            ContactInfo::whereIn('id', $phoneIds->slice(1))->delete();
        }

        // Synchroniser le numero WhatsApp
        $whatsappNumber = $request->input('whatsapp') ?? $validated['phone'];
        try {
            SiteSetting::firstOrCreate([])->update(['whatsapp_number' => $whatsappNumber]);
        } catch (\Exception $e) {}

        // Mettre à jour les réseaux sociaux
        $socials = [
            'facebook' => $request->input('facebook'),
            'instagram' => $request->input('instagram'),
            'linkedin' => $request->input('linkedin'),
            'tiktok' => $request->input('tiktok'),
        ];

        foreach ($socials as $platform => $url) {
            if ($url !== null) {
                SocialLink::updateOrCreate(
                    ['platform' => $platform],
                    [
                        'url' => $url,
                        'icon' => $platform,
                        'is_active' => !empty(trim($url)),
                    ]
                );
            }
        }

        if (!empty($whatsappNumber)) {
            $cleanWa = preg_replace('/[^\d]/', '', $whatsappNumber);
            $waUrl = str_starts_with($whatsappNumber, 'http') ? $whatsappNumber : "https://wa.me/{$cleanWa}";
            SocialLink::updateOrCreate(
                ['platform' => 'whatsapp'],
                [
                    'url' => $waUrl,
                    'icon' => 'whatsapp',
                    'is_active' => true,
                ]
            );
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
