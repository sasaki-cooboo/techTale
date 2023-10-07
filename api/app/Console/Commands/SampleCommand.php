<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use OpenAI\Laravel\Facades\OpenAI;

class SampleCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'command:sample';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $messages = [
            [
                "role" => 'system',
                "content" => "This is an assistant that generates job titles with random programming languages and content."
            ],
            [
                "role" => 'user',
                "content" => "Generate a job listing title. Please answer in Japanese. Answer the title only."
            ],
        ];
        $result = OpenAI::chat()->create([
            'model' => 'gpt-3.5-turbo',
            'messages' => $messages,
            "max_tokens" => 200
        ]);
        $res = $result['choices'][0]['message']['content'];
        $this->info($res);
        return Command::SUCCESS;
    }
}
