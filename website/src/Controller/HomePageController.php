<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Bundle\SecurityBundle\Security;

class HomePageController extends AbstractController
{
    public function __construct()
    {
    }

    #[Route('/home_page', name: 'app_home_page')]
    public function getProfile(): Response
    {
        return $this->render('home_page/home_page.html.twig', []);
    }
}
