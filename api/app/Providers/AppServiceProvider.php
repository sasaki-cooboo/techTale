<?php

namespace App\Providers;

use App\Services\AIChatService;
use App\Services\AIChatServiceInterface;
use App\Services\BatchProcessingService;
use App\Services\BatchProcessingServiceInterface;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind(AIChatServiceInterface::class, AIChatService::class);
        $this->app->bind(BatchProcessingServiceInterface::class, BatchProcessingService::class);
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        // 最も外側のリソースのラッピング（dataでラップされる）を無効にする
        JsonResource::withoutWrapping();
    }
}
