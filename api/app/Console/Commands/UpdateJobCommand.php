<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class UpdateJobCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'update:job';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = '案件修正コマンド';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $this->info('Bulk update completed.');
        return Command::SUCCESS;
    }
}
