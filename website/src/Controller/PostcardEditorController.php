<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Bundle\SecurityBundle\Security;

class PostcardEditorController extends AbstractController
{
    private $security;
    public function __construct(Security $security)
    {
        $this->security = $security;
    }

    #[Route('/postcard_editor', name: 'app_postcard_editor')]
    public function getProfile(): Response
    {
        $this->denyAccessUnlessGranted('IS_AUTHENTICATED_FULLY');
        $user = $this->security->getUser();
        return $this->render('postcard_editor/postcard_editor.html.twig', [
            "user" => [
                "username" => $user->getUsername(),
            ]
        ]);
    }
}
