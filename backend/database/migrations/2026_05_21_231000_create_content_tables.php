<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('company_info', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('short_name')->nullable();
            $table->string('tagline')->nullable();
            $table->text('description')->nullable();
            $table->text('mission')->nullable();
            $table->text('vision')->nullable();
            $table->string('image_url')->nullable();
            $table->string('logo_url')->nullable();
            $table->text('footer_text')->nullable();
            $table->timestamps();
        });

        Schema::create('hero_slides', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('order')->default(0);
            $table->string('eyebrow')->nullable();
            $table->string('title');
            $table->text('description')->nullable();
            $table->string('image_url')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        Schema::create('featured_projects', function (Blueprint $table) {
            $table->id();
            $table->string('label')->nullable();
            $table->string('title');
            $table->string('subtitle')->nullable();
            $table->json('features')->nullable();
            $table->string('button_text')->nullable();
            $table->string('button_link')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        Schema::create('stats', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('order')->default(0);
            $table->string('value');
            $table->string('label');
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        Schema::create('vision_sections', function (Blueprint $table) {
            $table->id();
            $table->string('eyebrow')->nullable();
            $table->string('title');
            $table->text('description')->nullable();
            $table->string('image_url')->nullable();
            $table->text('quote_text')->nullable();
            $table->string('quote_author')->nullable();
            $table->string('quote_role')->nullable();
            $table->string('quote_image_url')->nullable();
            $table->timestamps();
        });

        Schema::create('vision_stats', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('order')->default(0);
            $table->string('value');
            $table->string('suffix')->nullable();
            $table->string('label');
            $table->string('hint')->nullable();
            $table->timestamps();
        });

        Schema::create('services', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('order')->default(0);
            $table->string('title');
            $table->text('summary')->nullable();
            $table->text('example')->nullable();
            $table->text('result')->nullable();
            $table->string('icon')->nullable();
            $table->string('image_url')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        Schema::create('terrains', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('order')->default(0);
            $table->string('title');
            $table->string('location')->nullable();
            $table->string('price')->nullable();
            $table->string('promo_price')->nullable();
            $table->boolean('is_promotion')->default(false);
            $table->string('area')->nullable();
            $table->string('status')->nullable();
            $table->string('image_url')->nullable();
            $table->text('description')->nullable();
            $table->longText('long_description')->nullable();
            $table->json('features')->nullable();
            $table->json('highlights')->nullable();
            $table->json('proximity')->nullable();
            $table->json('gallery')->nullable();
            $table->boolean('is_featured')->default(false);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('order')->default(0);
            $table->string('slug')->unique();
            $table->string('title');
            $table->string('location')->nullable();
            $table->string('category')->nullable();
            $table->string('year')->nullable();
            $table->string('highlight')->nullable();
            $table->text('description')->nullable();
            $table->longText('long_description')->nullable();
            $table->json('key_features')->nullable();
            $table->json('results')->nullable();
            $table->string('image_url')->nullable();
            $table->string('video_url')->nullable();
            $table->json('gallery')->nullable();
            $table->boolean('is_featured')->default(false);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        Schema::create('news', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('order')->default(0);
            $table->string('slug')->unique();
            $table->string('title');
            $table->string('category')->nullable();
            $table->string('author')->nullable();
            $table->date('date')->nullable();
            $table->string('image_url')->nullable();
            $table->text('excerpt')->nullable();
            $table->longText('content')->nullable();
            $table->json('tags')->nullable();
            $table->json('gallery')->nullable();
            $table->boolean('is_featured')->default(false);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        Schema::create('team_members', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('order')->default(0);
            $table->string('name');
            $table->string('role')->nullable();
            $table->text('bio')->nullable();
            $table->string('image_url')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        Schema::create('principles', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('order')->default(0);
            $table->string('text');
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        Schema::create('page_headers', function (Blueprint $table) {
            $table->id();
            $table->string('page_name')->unique();
            $table->string('label')->nullable();
            $table->string('title');
            $table->text('lead')->nullable();
            $table->timestamps();
        });

        Schema::create('cta_sections', function (Blueprint $table) {
            $table->id();
            $table->string('page_name')->unique();
            $table->string('title');
            $table->text('description')->nullable();
            $table->string('button_text')->nullable();
            $table->string('button_link')->nullable();
            $table->timestamps();
        });

        Schema::create('contact_info', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('order')->default(0);
            $table->string('label');
            $table->text('value');
            $table->string('icon')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        Schema::create('contact_submissions', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email');
            $table->string('phone')->nullable();
            $table->string('subject')->nullable();
            $table->text('message');
            $table->foreignId('terrain_id')->nullable()->constrained('terrains')->nullOnDelete();
            $table->string('status')->default('new');
            $table->timestamps();
        });

        Schema::create('navigation_links', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('order')->default(0);
            $table->string('label');
            $table->string('url');
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        Schema::create('social_links', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('order')->default(0);
            $table->string('platform');
            $table->string('url');
            $table->string('icon')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        Schema::create('footer_columns', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('order')->default(0);
            $table->string('title');
            $table->string('type')->default('links');
            $table->timestamps();
        });

        Schema::create('footer_links', function (Blueprint $table) {
            $table->id();
            $table->foreignId('column_id')->constrained('footer_columns')->cascadeOnDelete();
            $table->unsignedInteger('order')->default(0);
            $table->string('label');
            $table->string('url');
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        Schema::create('site_settings', function (Blueprint $table) {
            $table->id();
            $table->string('site_name')->nullable();
            $table->string('site_tagline')->nullable();
            $table->text('site_description')->nullable();
            $table->string('logo_url')->nullable();
            $table->string('favicon_url')->nullable();
            $table->string('primary_color')->nullable();
            $table->string('secondary_color')->nullable();
            $table->string('whatsapp_number')->nullable();
            $table->text('whatsapp_message_template')->nullable();
            $table->string('google_analytics_id')->nullable();
            $table->string('facebook_pixel_id')->nullable();
            $table->string('creator_name')->nullable();
            $table->string('creator_whatsapp')->nullable();
            $table->boolean('maintenance_mode')->default(false);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        foreach ([
            'site_settings', 'footer_links', 'footer_columns', 'social_links', 'navigation_links',
            'contact_submissions', 'contact_info', 'cta_sections', 'page_headers', 'principles',
            'team_members', 'news', 'projects', 'terrains', 'services', 'vision_stats',
            'vision_sections', 'stats', 'featured_projects', 'hero_slides', 'company_info',
        ] as $table) {
            Schema::dropIfExists($table);
        }
    }
};
