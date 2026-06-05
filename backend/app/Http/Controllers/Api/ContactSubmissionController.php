<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ContactSubmission;
use Illuminate\Http\Request;

class ContactSubmissionController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'phone' => ['nullable', 'string', 'max:50'],
            'subject' => ['nullable', 'string', 'max:255'],
            'message' => ['required', 'string', 'max:5000'],
            'terrain_id' => ['nullable', 'exists:terrains,id'],
        ]);

        $submission = ContactSubmission::create($data);

        return response()->json([
            'message' => 'Votre message a bien ete envoye.',
            'data' => $submission,
        ], 201);
    }
}
