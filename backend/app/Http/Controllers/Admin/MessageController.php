<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContactSubmission;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    public function markAsRead($id)
    {
        $submission = ContactSubmission::findOrFail($id);
        $submission->update(['is_read' => true]);

        return response()->json([
            'message' => 'Message marque comme lu',
            'data' => $submission,
        ]);
    }

    public function markAsUnread($id)
    {
        $submission = ContactSubmission::findOrFail($id);
        $submission->update(['is_read' => false]);

        return response()->json([
            'message' => 'Message marque comme non lu',
            'data' => $submission,
        ]);
    }

    public function getStats()
    {
        return response()->json([
            'total_submissions' => ContactSubmission::count(),
            'unread_submissions' => ContactSubmission::where('is_read', false)->count(),
            'pending_submissions' => ContactSubmission::where('status', 'new')->count(),
        ]);
    }
}
