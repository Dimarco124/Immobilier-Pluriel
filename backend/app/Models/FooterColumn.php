<?php

namespace App\Models;

use App\Models\Concerns\ContentModel;

class FooterColumn extends ContentModel
{
    public function links()
    {
        return $this->hasMany(FooterLink::class, 'column_id')->orderBy('order');
    }
}
