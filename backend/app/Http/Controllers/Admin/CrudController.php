<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Schema;

class CrudController extends Controller
{
    private const RESOURCES = [
        'company-info' => \App\Models\CompanyInfo::class,
        'hero-slides' => \App\Models\HeroSlide::class,
        'featured-projects' => \App\Models\FeaturedProject::class,
        'stats' => \App\Models\Stat::class,
        'vision-sections' => \App\Models\VisionSection::class,
        'vision-stats' => \App\Models\VisionStat::class,
        'services' => \App\Models\Service::class,
        'terrains' => \App\Models\Terrain::class,
        'projects' => \App\Models\Project::class,
        'news' => \App\Models\News::class,
        'team-members' => \App\Models\TeamMember::class,
        'principles' => \App\Models\Principle::class,
        'page-headers' => \App\Models\PageHeader::class,
        'cta-sections' => \App\Models\CtaSection::class,
        'contact-info' => \App\Models\ContactInfo::class,
        'contact-submissions' => \App\Models\ContactSubmission::class,
        'navigation-links' => \App\Models\NavigationLink::class,
        'social-links' => \App\Models\SocialLink::class,
        'footer-columns' => \App\Models\FooterColumn::class,
        'footer-links' => \App\Models\FooterLink::class,
        'site-settings' => \App\Models\SiteSetting::class,
        'testimonials' => \App\Models\Testimonial::class,
        'legal-sections' => \App\Models\LegalSection::class,
    ];

    public function index(string $resource)
    {
        $model = $this->model($resource);

        $query = $model::query()
            ->when(request('search'), fn ($query, $search) => $query->where(function ($query) use ($search, $model) {
                foreach ($this->searchableColumns(new $model()) as $column) {
                    $query->orWhere($column, 'like', "%{$search}%");
                }
            }));

        if (Schema::hasColumn((new $model())->getTable(), 'order')) {
            $query->orderByRaw('`order` is null, `order` asc');
        }

        return $query->latest('id')->paginate((int) request('per_page', 20));
    }

    public function store(Request $request, string $resource)
    {
        $model = $this->model($resource);

        return response()->json($model::create($this->payload($request)), 201);
    }

    public function show(string $resource, int $id)
    {
        return $this->model($resource)::findOrFail($id);
    }

    public function update(Request $request, string $resource, int $id)
    {
        $record = $this->model($resource)::findOrFail($id);
        $record->update($this->payload($request));

        return $record->fresh();
    }

    public function destroy(string $resource, int $id)
    {
        $this->model($resource)::findOrFail($id)->delete();

        return response()->noContent();
    }

    private function model(string $resource): string
    {
        abort_unless(isset(self::RESOURCES[$resource]), 404, 'Ressource inconnue.');

        return self::RESOURCES[$resource];
    }

    private function payload(Request $request): array
    {
        return Arr::except($request->all(), ['id', 'created_at', 'updated_at']);
    }

    private function searchableColumns(Model $model): array
    {
        return array_values(array_intersect(
            ['title', 'name', 'label', 'email', 'location', 'category'],
            Schema::getColumnListing($model->getTable()),
        ));
    }
}
