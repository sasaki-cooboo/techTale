<?php

namespace App\Services;

class BatchProcessingService implements BatchProcessingServiceInterface
{
    private AIChatService $aIChatService;

    public function __construct(AIChatService $aIChatService)
    {
        $this->aIChatService = $aIChatService;
    }

    /**
     * 案件のタイトルを作成する
     *
     * @return string
     */
    public function getJobTitle(string $language): string
    {
        $messages = [
            [
                "role" => 'system',
                "content" => "This is an assistant that generates job titles with random programming languages and content."
            ],
            [
                "role" => 'user',
                "content" => "Generate a job listing title. Please answer in Japanese. Answer the title only. The language is {$language}. Examples:【フロントエンド/JavaScript/React/高単価】ポータルサイト開発案件,【PHP/Laravel/フルリモート】ECサイト開発の求人・案件,【TypeScript/Vue.js/Python/急募】人事系システム開発の求人・案件"
            ],
        ];
        return $this->aIChatService->generateResponse($messages);
    }
}
