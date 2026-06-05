<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::updateOrCreate([
            'email' => 'Admin@immobilierpluriel.com',
        ], [
            'name' => 'Administrateur',
            'password' => Hash::make('Pluriel@2024'),
        ]);

        $this->call(ContentSeeder::class);
    }
}
