<?php

namespace App\Models\Concerns;

use Illuminate\Database\Eloquent\Model;

abstract class ContentModel extends Model
{
    protected $guarded = [];

    protected $casts = [
        'features' => 'array',
        'highlights' => 'array',
        'proximity' => 'array',
        'gallery' => 'array',
        'key_features' => 'array',
        'results' => 'array',
        'tags' => 'array',
        'is_active' => 'boolean',
        'is_featured' => 'boolean',
        'is_promotion' => 'boolean',
        'is_read' => 'boolean',
        'maintenance_mode' => 'boolean',
        'date' => 'date:Y-m-d',
    ];
}
