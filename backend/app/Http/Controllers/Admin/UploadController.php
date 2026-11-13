<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class UploadController extends Controller
{
    public function upload(Request $request)
    {
        $request->validate([
            'file' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:5120', // 5MB max
        ]);

        try {
            $file = $request->file('file');
            
            // Générer un nom unique
            $filename = Str::random(10) . '_' . time() . '.' . $file->getClientOriginalExtension();
            
            // Stocker le fichier
            $path = $file->storeAs('uploads', $filename, 'public');
            
            // Générer l'URL
            $url = Storage::url($path);

            $storedFullPath = storage_path('app/public/' . $path);
            @chmod($storedFullPath, 0644);

            // Synchroniser automatiquement vers public_html/storage si Laravel est dans public_html/backend
            $parentStorageDir = dirname(base_path()) . '/storage/uploads';
            if (!is_dir($parentStorageDir)) {
                @mkdir($parentStorageDir, 0755, true);
            }
            if (is_dir($parentStorageDir)) {
                @copy($storedFullPath, $parentStorageDir . '/' . $filename);
                @chmod($parentStorageDir . '/' . $filename, 0644);
            }

            // Synchroniser aussi vers backend/public/storage
            $backendPublicStorage = public_path('storage/uploads');
            if (!is_dir($backendPublicStorage)) {
                @mkdir($backendPublicStorage, 0755, true);
            }
            if (is_dir($backendPublicStorage)) {
                @copy($storedFullPath, $backendPublicStorage . '/' . $filename);
                @chmod($backendPublicStorage . '/' . $filename, 0644);
            }

            return response()->json([
                'success' => true,
                'url' => $url,
                'path' => $path,
                'filename' => $filename,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de l\'upload: ' . $e->getMessage(),
            ], 500);
        }
    }

    public function delete(Request $request)
    {
        $request->validate([
            'path' => 'required|string',
        ]);

        try {
            Storage::disk('public')->delete($request->path);
            $filename = basename($request->path);
            @unlink(dirname(base_path()) . '/storage/uploads/' . $filename);
            @unlink(public_path('storage/uploads/' . $filename));

            return response()->json([
                'success' => true,
                'message' => 'Fichier supprimé avec succès',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la suppression: ' . $e->getMessage(),
            ], 500);
        }
    }
}
