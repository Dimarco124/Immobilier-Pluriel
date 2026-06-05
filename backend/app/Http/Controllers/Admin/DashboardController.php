<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContactSubmission;
use App\Models\News;
use App\Models\Project;
use App\Models\Service;
use App\Models\Terrain;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function __invoke()
    {
        $user = Auth::user();

        return [
            'admin_user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
            ],
            'stats' => [
                'total_projects' => Project::count(),
                'total_terrains' => Terrain::count(),
                'total_services' => Service::count(),
                'total_news' => News::count(),
                'total_views' => Terrain::sum('views') ?? 0,
                'pending_submissions' => ContactSubmission::where('status', 'new')->count(),
                'unread_submissions' => ContactSubmission::where('is_read', false)->count(),
            ],
            'recent_submissions' => ContactSubmission::latest()->limit(5)->get(['id', 'name', 'email', 'subject', 'status', 'is_read', 'created_at']),
            'recent_activities' => $this->getRecentActivities(),
            'top_terrains' => $this->getTopTerrains(),
        ];
    }

    private function getRecentActivities()
    {
        $activities = [];

        // Terrains récemment modifiés
        Terrain::latest('updated_at')->limit(2)->get()->each(function ($terrain) use (&$activities) {
            $activities[] = [
                'type' => 'terrain',
                'icon' => '🏠',
                'title' => 'Nouveau terrain - ' . $terrain->title,
                'description' => 'Mise à jour de ' . $terrain->location,
                'status' => $terrain->is_active ? 'Publié' : 'Brouillon',
                'time' => $terrain->updated_at,
            ];
        });

        // Projets récemment modifiés
        Project::latest('updated_at')->limit(2)->get()->each(function ($project) use (&$activities) {
            $activities[] = [
                'type' => 'project',
                'icon' => '🏗️',
                'title' => 'Projet ' . $project->title,
                'description' => 'Configuration de ' . $project->location,
                'status' => $project->is_active ? 'Publié' : 'Brouillon',
                'time' => $project->updated_at,
            ];
        });

        // Actualités récemment modifiées
        News::latest('updated_at')->limit(1)->get()->each(function ($news) use (&$activities) {
            $activities[] = [
                'type' => 'news',
                'icon' => '📰',
                'title' => 'Actualité - ' . $news->title,
                'description' => 'Rédaction du contenu pour l\'annonce',
                'status' => $news->is_active ? 'Publié' : 'Brouillon',
                'time' => $news->updated_at,
            ];
        });

        // Messages en attente
        $pendingCount = ContactSubmission::where('status', 'new')->count();
        if ($pendingCount > 0) {
            $activities[] = [
                'type' => 'messages',
                'icon' => '💬',
                'title' => $pendingCount . ' message(s) en attente',
                'description' => 'Vérifier et approuver les nouveaux messages de contact',
                'status' => 'Urgent',
                'time' => now(),
                'count' => $pendingCount,
            ];
        }

        return collect($activities)
            ->sortByDesc('time')
            ->values()
            ->all();
    }

    private function getTopTerrains()
    {
        return Terrain::where('is_active', true)
            ->orderByDesc('views')
            ->limit(3)
            ->get(['id', 'title', 'location', 'views'])
            ->map(function ($terrain, $index) {
                return [
                    'id' => $terrain->id,
                    'rank' => $index + 1,
                    'name' => $terrain->title,
                    'location' => $terrain->location,
                    'views' => $terrain->views ?? 0,
                    'sales' => 0, // À adapter selon votre métrique
                ];
            })
            ->all();
    }
}
