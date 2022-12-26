<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Doctrine\ORM\EntityManagerInterface;
use App\Form\EditProfileFormType;
use Symfony\Bundle\SecurityBundle\Security;
use App\Repository\UserRepository;

use App\Entity\User;
use App\Entity\UserEditDto;


class ProfileController extends AbstractController
{
    private $security;
    private $userRepository;
    private $entityManager;
    public function __construct(Security $security, UserRepository $userRepository, EntityManagerInterface $entityManager)
    {
        $this->security = $security;
        $this->userRepository = $userRepository;
        $this->entityManager = $entityManager;
    }

    #[Route('/profile', name: 'app_profile')]
    public function getProfile(): Response
    {
        $this->denyAccessUnlessGranted('IS_AUTHENTICATED_FULLY');
        $user = $this->security->getUser();
        return $this->render('profile/profile.html.twig', [
            "user" => [
                "username" => $user->getUsername(),
                "description" => $user->getDescription(),
            ]
        ]);
    }

    #[Route('/profile/edit', name: 'app_profile_edit')]
    public function editProfile(Request $request): Response
    {
        $this->denyAccessUnlessGranted('IS_AUTHENTICATED_FULLY');
        $user = $this->security->getUser();
        $userDto = new UserEditDto();
        $userDto->setUsername($user->getUsername());
        $userDto->setDescription($user->getDescription());
        $form = $this->createForm(EditProfileFormType::class, $userDto);
        $form->handleRequest($request);

        $msg = "";
        if ($form->isSubmitted() && $form->isValid()) {
            $succ = $this->editUserHelper($user, $userDto);
            if ($succ) {
                return $this->redirectToRoute('app_profile');
            } else {
                $msg = "User with this name already exists";
            }
        }

        return $this->render('profile/edit.html.twig', [
            'editForm' => $form->createView(),
            'msg' => $msg,
        ]);
    }

    private function editUserHelper(User $user, UserEditDto $userDto) {
        $newUsername = $userDto->getUsername();
        $oldUsername = $user->getUsername();
        if ($newUsername !== $oldUsername) {
            $otherUser = $this->userRepository->findOneBy(["username" => $userDto->getUsername()]);
            if ($otherUser !== NULL) {
                return false;
            }
            
            $user->setUsername($userDto->getUsername());
        }
        $user->setDescription($userDto->getDescription());


        $this->entityManager->persist($user);
        $this->entityManager->flush();
        return true;
    }
}
