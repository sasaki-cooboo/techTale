<?php

namespace App\Services;

interface BatchProcessingServiceInterface
{
    public function getJobTitle(string $language): string;
}
