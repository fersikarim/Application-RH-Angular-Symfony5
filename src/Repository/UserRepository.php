<?php

namespace App\Repository;

use App\Entity\User;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;
use Doctrine\ORM\EntityManagerInterface;

/**
 * @method Customer|null find($id, $lockMode = null, $lockVersion = null)
 * @method Customer|null findOneBy(array $criteria, array $orderBy = null)
 * @method Customer[]    findAll()
 * @method Customer[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class UserRepository extends ServiceEntityRepository
{
    private $manager;

    public function __construct
    (
        ManagerRegistry $registry,
        EntityManagerInterface $manager
    )
    {
        parent::__construct($registry, User::class);
        $this->manager = $manager;
    }

    public function saveUser($name, $email, $password, $phone, $role)
    {
        $newUser = new User();

        $newUser
            ->setname($name)
            ->setemail($email)
            ->setpassword($password)
            ->setphone($phone)
            ->setrole($role);
        $this->manager->persist($newUser);
        $this->manager->flush();
    }

    public function updateUser(User $user, $data)
    {
        empty($data['name']) ? true : $user->setname($data['name']);
        empty($data['lastName']) ? true : $user->setemail($data['lastName']);
        empty($data['email']) ? true : $user->setpassword($data['email']);
        empty($data['phoneNumber']) ? true : $user->setphone($data['phoneNumber']);
        empty($data['role']) ? true : $user->setrole($data['role']);
        $this->manager->flush();
    }

    public function removeUser(User $user)
    {
        $this->manager->remove($user);
        $this->manager->flush();
    }
}

