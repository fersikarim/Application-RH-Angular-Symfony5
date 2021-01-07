<?php

namespace App\Controller;

use App\Repository\UserRepository;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Routing\Annotation\Route;

/**
 * Class userSiteController
 * @package App\Controller
 *
 * @Route(path="/user")
 */
class UserController
{
    private $userRepository;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    /**
     * @Route("/add", name="add_user", methods={"POST"})
     */
    public function adduser(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $name = $data['name'];
        $email = $data['email'];
        $password = $data['password'];
        $phone = $data['phone'];
		$role = $data['role'];

        if (empty($name) || empty($email) || empty($password) || empty($phone)|| empty($role)) {
            throw new NotFoundHttpException('Expecting mandatory parameters!');
        }

        $this->userRepository->saveUser($name, $email, $password, $phone, $role);

        return new JsonResponse(['status' => 'user added!'], Response::HTTP_CREATED);
    }

    /**
     * @Route("/get/{id}", name="get_one_user", methods={"GET"})
     */
    public function getOneuser($id): JsonResponse
    {
        $user = $this->userRepository->findOneBy(['id' => $id]);

        $data = [
            'id' => $user->getId(),
            'name' => $user->getname(),
            'email' => $user->getemail(),
            'password' => $user->getEmail(),
            'phone' => $user->getphone(),
			'role' => $user->getrole(),
        ];

        return new JsonResponse(['user' => $data], Response::HTTP_OK);
    }

    /**
     * @Route("/get-all", name="get_all_users", methods={"GET"})
     */
    public function getAllusers(): JsonResponse
    {
        $users = $this->userRepository->findAll();
        $data = [];

        foreach ($users as $user) {
            $data[] = [
                'id' => $user->getId(),
                'name' => $user->getname(),
                'email' => $user->getemail(),
                'password' => $user->getEmail(),
                'phone' => $user->getphone(),
				'role' => $user->getrole(),
            ];
        }

        return new JsonResponse(['users' => $data], Response::HTTP_OK);
    }

    /**
     * @Route("/update/{id}", name="update_user", methods={"PUT"})
     */
    public function updateuser($id, Request $request): JsonResponse
    {
        $user = $this->userRepository->findOneBy(['id' => $id]);
        $data = json_decode($request->getContent(), true);

        $this->userRepository->updateuser($user, $data);

        return new JsonResponse(['status' => 'user updated!']);
    }

    /**
     * @Route("/delete/{id}", name="delete_user", methods={"DELETE"})
     */
    public function deleteuser($id): JsonResponse
    {
        $user = $this->userRepository->findOneBy(['id' => $id]);

        $this->userRepository->removeuser($user);

        return new JsonResponse(['status' => 'user deleted']);
    }
}
