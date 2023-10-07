<?php

namespace App\Services;

interface AIChatServiceInterface
{
    public function generateResponse(array $messages): string;
}
