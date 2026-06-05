<?php

namespace App\Console\Commands;

use App\Models\ContactSubmission;
use Illuminate\Console\Command;

class GenerateTestMessages extends Command
{
    protected $signature = 'db:test-messages';
    protected $description = 'Generate test contact messages for development';

    public function handle()
    {
        $messages = [
            [
                'name' => 'Jean Dupont',
                'email' => 'jean.dupont@example.com',
                'phone' => '+225 07 00 00 00 00',
                'subject' => 'Intéressé par le lotissement Bingerville',
                'message' => 'Bonjour, je suis très intéressé par vos lots de 500m² à Bingerville. Pouvez-vous me fournir plus d\'informations sur les conditions de paiement et la viabilisation?',
                'is_read' => false,
                'status' => 'new',
            ],
            [
                'name' => 'Fatou Traoré',
                'email' => 'fatou.traore@example.com',
                'phone' => '+225 08 00 00 00 00',
                'subject' => 'Demande d\'information - Zone industrielle',
                'message' => 'Je recherche un terrain pour mon projet agroalimentaire. Est-ce que vous avez des terrains disponibles près de San Pedro?',
                'is_read' => false,
                'status' => 'new',
            ],
            [
                'name' => 'Issa Kone',
                'email' => 'issa.kone@example.com',
                'phone' => '+225 09 00 00 00 00',
                'subject' => 'Visite de propriété demandée',
                'message' => 'Je souhaiterais visiter le Domaine de la Lagune à Grand-Bassam. Quels sont vos horaires de visite?',
                'is_read' => true,
                'status' => 'new',
            ],
            [
                'name' => 'Awa Coulibaly',
                'email' => 'awa.coulibaly@example.com',
                'phone' => '+225 06 00 00 00 00',
                'subject' => 'Question sur financement',
                'message' => 'Proposez-vous des facilités de financement pour l\'achat de parcelles? Je suis intéressée par Cité de l\'Espoir.',
                'is_read' => false,
                'status' => 'new',
            ],
            [
                'name' => 'Moussa Diallo',
                'email' => 'moussa.diallo@example.com',
                'phone' => '+225 05 00 00 00 00',
                'subject' => 'Devis pour services de viabilisation',
                'message' => 'Je gère un projet d\'aménagement dans le nord. Pouvez-vous me proposer un devis pour la viabilisation VRD?',
                'is_read' => false,
                'status' => 'pending',
            ],
        ];

        foreach ($messages as $messageData) {
            ContactSubmission::updateOrCreate(
                ['email' => $messageData['email'], 'subject' => $messageData['subject']],
                $messageData
            );
        }

        $this->info('✓ ' . count($messages) . ' test messages created successfully!');
    }
}
