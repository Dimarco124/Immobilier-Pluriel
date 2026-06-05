<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\CompanyInfo;
use App\Models\ContactInfo;
use App\Models\CtaSection;
use App\Models\FooterColumn;
use App\Models\HeroSlide;
use App\Models\NavigationLink;
use App\Models\News;
use App\Models\PageHeader;
use App\Models\Principle;
use App\Models\Project;
use App\Models\Service;
use App\Models\SiteSetting;
use App\Models\SocialLink;
use App\Models\Stat;
use App\Models\TeamMember;
use App\Models\Terrain;
use App\Models\VisionSection;
use App\Models\VisionStat;
use App\Models\Testimonial;

class PublicContentController extends Controller
{
    public function heroSlides()
    {
        return HeroSlide::where('is_active', true)->orderBy('order')->get();
    }

    public function testimonials()
    {
        return Testimonial::where('is_active', true)->orderBy('order')->get();
    }

    public function stats()
    {
        return Stat::where('is_active', true)->orderBy('order')->get();
    }

    public function vision()
    {
        return [
            'section' => VisionSection::first(),
            'stats' => VisionStat::orderBy('order')->get(),
        ];
    }

    public function services()
    {
        return Service::where('is_active', true)->orderBy('order')->get();
    }

    public function terrains()
    {
        return Terrain::where('is_active', true)
            ->when(request('featured'), fn ($query) => $query->where('is_featured', true))
            ->when(request('promotion'), fn ($query) => $query->where('is_promotion', true))
            ->when(request('is_promotion'), fn ($query) => $query->where('is_promotion', request('is_promotion') === '1' || request('is_promotion') === 'true'))
            ->when(request('status'), fn ($query, $status) => $query->where('status', $status))
            ->when(request('location'), fn ($query, $location) => $query->where('location', 'like', "%{$location}%"))
            ->when(request('sort') === 'latest', fn ($query) => $query->latest('created_at'))
            ->when(request('sort') !== 'latest', fn ($query) => $query->orderBy('order')->orderByDesc('created_at'))
            ->paginate((int) request('per_page', 12));
    }

    public function terrain(Terrain $terrain)
    {
        abort_unless($terrain->is_active, 404);

        return $terrain;
    }

    public function projects()
    {
        return Project::where('is_active', true)
            ->when(request('featured'), fn ($query) => $query->where('is_featured', true))
            ->when(request('category'), fn ($query, $category) => $query->where('category', $category))
            ->orderBy('order')
            ->orderByDesc('created_at')
            ->paginate((int) request('per_page', 12));
    }

    public function project(string $identifier)
    {
        return Project::where('is_active', true)
            ->where(fn ($query) => $query->where('id', $identifier)->orWhere('slug', $identifier))
            ->firstOrFail();
    }

    public function news()
    {
        return News::where('is_active', true)
            ->when(request('category'), fn ($query, $category) => $query->where('category', $category))
            ->orderByDesc('date')
            ->orderBy('order')
            ->paginate((int) request('per_page', 12));
    }

    public function article(string $identifier)
    {
        $article = News::where('is_active', true)
            ->where(fn ($query) => $query->where('id', $identifier)->orWhere('slug', $identifier))
            ->firstOrFail();

        return [
            'article' => $article,
            'related' => News::where('is_active', true)
                ->where('id', '!=', $article->id)
                ->where('category', $article->category)
                ->latest('date')
                ->limit(3)
                ->get(),
        ];
    }

    public function team()
    {
        return [
            'header' => PageHeader::where('page_name', 'team')->first(),
            'company' => CompanyInfo::first(),
            'principles' => Principle::where('is_active', true)->orderBy('order')->get(),
            'members' => TeamMember::where('is_active', true)->orderBy('order')->get(),
            'cta' => CtaSection::where('page_name', 'team')->first(),
        ];
    }

    public function companyInfo()
    {
        return CompanyInfo::first();
    }

    public function navigation()
    {
        return NavigationLink::where('is_active', true)->orderBy('order')->get();
    }

    public function socialLinks()
    {
        return SocialLink::where('is_active', true)->orderBy('order')->get();
    }

    public function contactInfo()
    {
        return ContactInfo::where('is_active', true)->orderBy('order')->get();
    }

    public function siteSettings()
    {
        return SiteSetting::first();
    }

    public function footer()
    {
        return FooterColumn::with('links')->orderBy('order')->get();
    }

    public function pageHeader(string $page)
    {
        return PageHeader::where('page_name', $page)->firstOrFail();
    }

    public function legalSections(string $page)
    {
        return \App\Models\LegalSection::where('page', $page)
            ->orderBy('order')
            ->get();
    }
}
