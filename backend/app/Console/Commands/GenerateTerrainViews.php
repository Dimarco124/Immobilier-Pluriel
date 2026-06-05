<?php

namespace App\Console\Commands;

use App\Models\Terrain;
use Illuminate\Console\Command;

class GenerateTerrainViews extends Command
{
    protected $signature = 'db:terrain-views';
    protected $description = 'Generate random view counts for terrains';

    public function handle()
    {
        $terrains = Terrain::all();

        foreach ($terrains as $terrain) {
            $terrain->update([
                'views' => rand(100, 2500),
            ]);
        }

        $this->info('✓ View counts added to ' . count($terrains) . ' terrains!');
        
        // Show top terrains
        $topTerrains = Terrain::where('is_active', true)
            ->orderByDesc('views')
            ->limit(5)
            ->get(['title', 'views']);

        $this->info("\nTop 5 terrains by views:");
        foreach ($topTerrains as $index => $terrain) {
            $this->line(($index + 1) . '. ' . $terrain->title . ' - ' . $terrain->views . ' vues');
        }
    }
}
