<?php

namespace App\Console\Commands;

use App\Services\BatchProcessingService;
use Illuminate\Console\Command;

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
    public function handle(BatchProcessingService $batchProcessingService)
    {
        $language = "react typescript";
        $this->info($batchProcessingService->getJobTitle($language));
        return Command::SUCCESS;
    }
}
