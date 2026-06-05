<?php

use App\Http\Controllers\Admin\AuthController;
use App\Http\Controllers\Admin\CrudController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\MessageController;
use App\Http\Controllers\Admin\SettingsController;
use App\Http\Controllers\Admin\UploadController;
use App\Http\Controllers\Api\ContactSubmissionController;
use App\Http\Controllers\Api\PublicContentController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/hero-slides', [PublicContentController::class, 'heroSlides']);
Route::get('/testimonials', [PublicContentController::class, 'testimonials']);
Route::get('/stats', [PublicContentController::class, 'stats']);
Route::get('/vision', [PublicContentController::class, 'vision']);
Route::get('/services', [PublicContentController::class, 'services']);
Route::get('/terrains', [PublicContentController::class, 'terrains']);
Route::get('/terrains/{terrain}', [PublicContentController::class, 'terrain']);
Route::get('/projects', [PublicContentController::class, 'projects']);
Route::get('/projects/{identifier}', [PublicContentController::class, 'project']);
Route::get('/news', [PublicContentController::class, 'news']);
Route::get('/news/{identifier}', [PublicContentController::class, 'article']);
Route::get('/team', [PublicContentController::class, 'team']);
Route::get('/company-info', [PublicContentController::class, 'companyInfo']);
Route::get('/navigation', [PublicContentController::class, 'navigation']);
Route::get('/social-links', [PublicContentController::class, 'socialLinks']);
Route::get('/contact-info', [PublicContentController::class, 'contactInfo']);
Route::get('/site-settings', [PublicContentController::class, 'siteSettings']);
Route::get('/footer', [PublicContentController::class, 'footer']);
Route::get('/page-headers/{page}', [PublicContentController::class, 'pageHeader']);
Route::get('/legal-sections/{page}', [PublicContentController::class, 'legalSections']);
Route::post('/contact', [ContactSubmissionController::class, 'store']);

Route::prefix('admin')->group(function () {
    Route::post('/login', [AuthController::class, 'login']);

    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/user', fn (Request $request) => $request->user());
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::get('/dashboard', DashboardController::class);
        Route::post('/upload', [UploadController::class, 'upload']);
        Route::delete('/upload', [UploadController::class, 'delete']);
        
        // Settings endpoint
        Route::post('/settings/company', [SettingsController::class, 'updateCompany']);
        Route::post('/settings/legal', [SettingsController::class, 'updateLegal']);
        
        // Messages endpoints
        Route::post('/messages/{id}/read', [MessageController::class, 'markAsRead']);
        Route::post('/messages/{id}/unread', [MessageController::class, 'markAsUnread']);
        Route::get('/messages/stats', [MessageController::class, 'getStats']);
        
        Route::get('/{resource}', [CrudController::class, 'index']);
        Route::post('/{resource}', [CrudController::class, 'store']);
        Route::get('/{resource}/{id}', [CrudController::class, 'show']);
        Route::put('/{resource}/{id}', [CrudController::class, 'update']);
        Route::patch('/{resource}/{id}', [CrudController::class, 'update']);
        Route::delete('/{resource}/{id}', [CrudController::class, 'destroy']);
    });
});
