<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Hash;

class UpdateAdminCredentials extends Command
{
    protected $signature = 'admin:update-credentials';
    protected $description = 'Update admin email and password to new credentials';

    public function handle()
    {
        // Delete old admin user
        User::where('email', 'admin@immobilier-pluriel.ci')->delete();

        // Create new admin user
        User::updateOrCreate([
            'email' => 'Admin@immobilierpluriel.com',
        ], [
            'name' => 'Administrateur',
            'password' => Hash::make('Pluriel@2024'),
        ]);

        $this->info('✓ Admin credentials updated successfully!');
        $this->line('  Email: Admin@immobilierpluriel.com');
        $this->line('  Password: Pluriel@2024');
    }
}
