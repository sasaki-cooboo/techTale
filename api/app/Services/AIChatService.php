<?php

namespace App\Services;

use App\Services\AIChatServiceInterface;
use OpenAI\Laravel\Facades\OpenAI;

class AIChatService implements AIChatServiceInterface
{
    /**
     * @param array メッセージ
     *
     * @return string 回答
     */
    public function generateResponse(array $messages): string
    {
        $result = OpenAI::chat()->create([
            'model' => 'gpt-3.5-turbo',
            'messages' => $messages,
            'max_tokens' => 200
        ]);

        return $result['choices'][0]['message']['content'];
    }
}
